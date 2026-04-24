# Two tier deployment using an Auto Scaling Group (ASG)  with a Load Balancer (LB)

## Task Manager App
To explain how to build a two tier deployment, I created a simple task management application using Flask and MongoDB.

**N-tier architecture** is a client-server software design which breaks the application into logical and physical separated tiers to improve scalability, maintainability and security. 

In my project, I have divided the application into two, the Client tier (user interface and application logic)  and a Server tier (database).

### Creating and Testing App
I created my app and tested it locally.  I connected it to my MongoDB Atlas account to make sure the database is created and data was being stored correctly. 

![Local Database Test](/images/DBConnection.png)

After testing and confirming the database was created and data received correctly, I then started making changes to ensure I could deploy it on AWS.

## 🗃️ Client Tier
To create this tier, I logged into AWS and created an EC2 instance with the following:
- ***EC2 Instance***:
    - **AMI (Amazon Machine Image)**
        - Ubuntu 22.04 LTS
    - **Instance type**
        - t3.micro (free tier)
    - **Security Group Rules**
        - SSH - 22 (My IP address so I can connect)
        - HTTP - 80 (Web traffic (Nginx will use this))
        - Custom TCP - 5000 (Flask access for testing)

- ***Connect to EC2 Instance***:
    ```bash
    # Create key file and secure key
    chmod 400 your-key.pem

    # Connect (copy connection string from AWS)
    ssh -i your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
    ```

- ***Update System***
    ```bash
    # Update packages
    sudo apt update -y

    # Upgrade packages
    sudo apt upgrade -y
    ```

- ***Install Python, nginx and Git***
    - *python3-pip* - Package manager for python
    - *python3-venv* - Isolated Python environment
    - *git* - Clone my code from GitHub
    - *nginx* - Web Server
    
    ```bash
    sudo apt install -y python3-pip python3-venv git nginx
    ```

- ***Configure nginx (Reverse Proxy)***
    ```bash
    cd /etc/nginx/sites-available

    # Configure default document
    sudo nano default
    ![default](images/)(Add image)

    # Forward dynamic request
    location / {
        proxy_pass http://127.0.0.1:5000;
    }

    # Start nginx for changes to be registered
    sudo systemctl start nginx -y
    ```
- ***Clone and Setup Application***
    ```bash
    # Clone my code
    git clone https://github.com/lizkodjo/TaskManager.git
    cd TaskManager
    ```
    ![Cloned folder](images/ClonedRepo.png) 

    ```bash
     # Create virtual environment
     python3 -m venv venv

     # Activate it
     source venv/bin/activate

     # Install dependencies
     pip install -r requirements.txt
     
     ```
    
     


## 🗄️ Server Tier

To create this tier, I created another EC2 instance with the following:
- ***EC2 Instance***:
    - **AMI (Amazon Machine Image)**
        - Ubuntu 22.04 LTS
    - **Instance type**
        - t3.micro (free tier)
    - **Security Group Rules**
        - SSH - 22 (My IP address so I can connect)
        - Custom TCP - 27017 (MongoDB)

- ***Connect, update and upgrade***



- cd into folder
- set environment variable  `export MONGO_URI="your_mongodb_connection_string"` (mongodb public ip address(export MONGO_URI=mongodb:publicIPaddress:27017)) set this on the app instance
- update
- upgrade

## Database
- Create instance, update and upgrade (check if curl is installed and aslo install gpg)
- 


    ```bash
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
   ```

```bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

#    Update
sudo apt update -y

# Install
sudo apt install -y mongodb-org

# Start
sudo systemctl start mongod
   ```


## Configure mongo

`cd /` to get to root (cd /etc, mongoconf, change bindip, then restart)

- printenv



