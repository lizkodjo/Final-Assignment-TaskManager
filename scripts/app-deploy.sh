#!/bin/bash

# Update packages
sudo apt update -y

# Upgrade packages
sudo apt upgrade -y

# Install various dependencies including git, python and nginx
sudo apt install python3-pip python3-venv git -y

# Install nginx
sudo apt install nginx -y

# install sed
sudo apt install sed -y

# use sed to change nginx config
sudo sed -i '51c\proxy_pass http://127.0.0.1:5000;' /etc/nginx/sites-available/default

# restart nginx - to make sure the changes are put into effect
sudo systemctl restart nginx

# enable --> makes the process a startup process
sudo systemctl enable nginx

# Clone the app code
git clone "https://github.com/lizkodjo/TaskManager.git"


# Change directory into app folder (cd)
cd TaskManager

# Create a virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Production server
# pip install gunicorn

# Test Flask
python app.py