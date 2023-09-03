# Movie_listing_website_Project
Deploying a movie listing web application in AWS cloud infrastructure with proper load balancing involves several key points to ensure a scalable, reliable, and efficient setup. 
  Here are the main points for the project:
  
    -Application Architecture:
          Define the architecture of the movie listing web application, including the front-end (Client) and back-end (server-side) components.
          Choose appropriate technologies and frameworks for the application.
          
    -AWS Account Setup:
          Create an AWS account if one doesn't already exist.
          Set up IAM (Identity and Access Management) roles and permissions to ensure proper access control and security.
          
    -EC2 Instances:
          Launch EC2 instances to host the application's back-end.
          Use Auto Scaling to automatically adjust the number of instances based on traffic demands.
          
    -Load Balancer:
          Set up an Elastic Load Balancer (ELB) or an Application Load Balancer (ALB) to distribute incoming traffic evenly across multiple EC2 instances.
          This helps improve application availability and scalability.
          
    -Database Setup:
          Choose an appropriate database service like MongoDB or Amazon RDS (Relational Database Service) to store movie information and user data.
          Configure the database and establish the connection between the application and the database.
          
    -Security and Access Control:
          Implement security measures, such as configuring security groups and Network ACLs (Access Control Lists) to restrict access to the application and database.
          Enable HTTPS using SSL/TLS certificates for secure communication.
    
    -Monitoring and Logging:
          Set up CloudWatch to monitor the application's performance, including CPU usage, memory, and network metrics.
          Configure logging to capture application and server logs for debugging and analysis.
          Auto Scaling and Load Balancer Configuration:
    
    Configure Auto Scaling policies to automatically adjust the number of instances based on predefined thresholds (e.g., CPU utilization, network traffic).
    Fine-tune load balancer settings for optimal performance and failover behavior.
    
   ![movie listing app interface](https://github.com/Gangadhar-7/Movie_listing_website_Project/assets/102216404/c9c7c241-078f-420e-a4d8-1dc12c991bf3)
   <h1 align="center">USER-INTERFACE(UI)</h1>
   
   ![image](https://github.com/Gangadhar-7/Movie_listing_website_Project/assets/102216404/685fc1b2-a1d3-4133-b3ea-2e8e995cd2b8)
   <h1 align="center">Viewing the Movie Details which are uploaded into the movie listing website</h1>
   



    
