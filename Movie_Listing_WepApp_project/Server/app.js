//importing required Modules AND Packages

require('dotenv').config()
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const express = require('express');
const Movie = require('./Models/Movie')
const multer = require('multer');
const cors = require('cors')
const dotenv = require("dotenv");
dotenv.config();
const AWS = require("aws-sdk");
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const bucketName = process.env.bucketName;
const app = express();
const port = 5000;
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())





//--------------------------------------MONGO DB Backend------------------------



// connecting to mongoDB database
mongoose.connect(
  "mongodb+srv://mahesh:mahesh@moviesdata.krdsyxj.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
  )
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));


cloudinary.config({
cloud_name: 'dec6gy3wy',
api_key: '355514238263871',
api_secret: 'fkxhW0wjFM1XciQrJGl6kZk-Qn0'
});



// multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage });

// posting data to mongoDB Database
app.post('/api/movies', upload.single('poster'), async (req, res) => {
  try {
    console.log("entered")
    const result = await cloudinary.uploader.upload(req.file.path);
    const movie = new Movie({
      title: req.body.title,
      director: req.body.director,
      releaseYear: req.body.releaseYear,
      poster: result.secure_url
    });
    await movie.save();
    res.send(movie);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

// getting data from mongodb databse
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});


//-----------------------------S3 Backend------------------------------------------------



const awsConfig = {
  accessKeyId: process.env.AccessKey,
  secretAccessKey: process.env.SecretKey,
  region: process.env.region,
};

const S3 = new AWS.S3(awsConfig);

// checking file Type
let upload1 = multer({
  // storage: multer.memoryStorage(),
  limits: {
      fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (req, file, done) {
      // if (
      //     file.mimetype === "image/jpeg" ||
      //     file.mimetype === "image/png" ||
      //     file.mimetype === "image/jpg"
      // ) {
      //     done(null, true);
      // } else {
      //     //prevent the upload
      //     var newError = new Error("File type is incorrect");
      //     newError.name = "MulterError";
      //     done(newError, false);
      // }
      done(null, true);
  },
});

// uploading to S3
const uploadToS3 = (fileData) => {
  return new Promise((resolve, reject) => {
      const params = {
          Bucket: bucketName,
          Key: `${Date.now().toString()}.jpg`,
          Body: fileData,
      };
      S3.upload(params, (err, data) => {
          if (err) {
              console.log(err);
              return reject(err);
          }
          console.log(data);
          return resolve(data);
      });
  });
};

//posting image to S3
app.post("/upload", upload1.single("poster"), async (req, res) => {
  console.log(req.file);
  if (req.file) {
      await uploadToS3(req.file.buffer);
  }
  res.send({
      msg: "Image uploaded succesfully",
  });
});



//-----------------------------------Starting the Server--------------------------------------


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});