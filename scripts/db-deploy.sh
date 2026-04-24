#!/bin/bash

# Update packages
sudo apt update -y

# Upgrade packages
sudo apt upgrade -y

# Install gnupg and curl
sudo apt install gnupg -y
sudo apt install curl -y

# Install MongoDB 7.0
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Create source list file
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update again
sudo apt update -y

# Install Mongodb
sudo apt install -y mongodb-org

# Install sed (Stream Editor)
sudo apt install sed -y

# Configure bind IP value
sudo sed -i 's/bindIp: 127.0.0.1/bindIp: 0.0.0.0/' /etc/mongod.conf

# start mongodb
sudo systemctl restart mongod

# enable mongod --> makes mongodb a startup process
sudo systemctl enable mongod