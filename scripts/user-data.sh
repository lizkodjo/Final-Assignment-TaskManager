#!/bin/bash
sleep 10
cd /home/ubuntu

export MONGO_URI=mongodb://PublicIPAddress:27017

cd TaskManager

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

python app.py