# Mini Project to Submit

- cd into folder
- set environment variable  `export MONGO_URI="your_mongodb_connection_string"` (mongodb public ip address(export MONGO_URI=mongodb:publicIPaddress:27017)) set this on the app instance


Please complete a two tier deployment inside an ASG with an LB and document in a professional way. Host this on a GitHub Repo.

The deployment can be the Sparta app + MongoDB, or your own choice of software.

Technical Requirements
The deployment must:
- Run on EC2 (AWS)
- Must be 2-tier (frontend and database deployed on separate servers).
- Automatically scale under load (ASG)
- Provide an endpoint that balances traffic (LB)
- Be observable (logs + metrics)

Deliverables
You should upload to the final project submission the following content:
- A professional looking GitHub repo that contains:
  - A welcome README.md file that outlines the project and it's goals
  - Scripts to deploy the app and database
  - A  guide showing how to deploy the app an database using a script, images and then       images + User data
  - A guide showing how to move your automated deployment (image and user data) to an Autoscaling group

Extra notes/tips:
  - The app should be autoscaled, the db can be static
  - Showcase the setup of relevant cloudwatch alarms and notifications for bonus marks
  - A dashboard showing the ASG metrics would be beneficial to have and will get you bonus marks
  - Include screenshots!
  - A diagram of the ASG architecture will get you more marks
  - A file that include some explanation of the concepts/theory and the business value of ASGs will get you extra marks
  - ASG Scaling policy = Min 2, Max 3 Desired 2
  - Must be t3.micro (instance type)
  - Must terminate everything once documentation is completed

Soft Deadline:

2 weeks (Friday 24th of April)