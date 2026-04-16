# Task Manager with MongoDB
A simple task management web application built with Flask and MongoDB.

## Features

- ✅ Create, read, update and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Set priority levels (High, Medium, Low)
- ✅ Filter tasks by status (All, Pending, Completed)
- ✅ Responsive design with gradient styling
- ✅ RESTful API endpoints

## Tech Stack

- **Backend**: Flask (Python)
- **Database**: MongoDB
- **Frontend**: HTML5, CSS3, JavaScript
- **Deployment**: AWS EC2 (Ubuntu)

## Prerequisites

- Python 3.8+
- MongoDB (local or MongoDB Atlas)
- Git

## Local Development Setup
1. **Clone the repository**
    ```bash
    git clone https://github.com/lizkodjo/Final-Assignment-TaskManager.git
    cd Final-Assignment-TaskManager
    ```
2. **Create virtual environment**
    ```python
    python3 -m venv venv
    source venv\Scripts\activate    

    # On Windows: venv\Scripts\activate.bat
    ```

3. **Install dependencies**
    ```python
    pip install -r requirements.txt
    ```

4. **Set up MongoDB**
    - Local: Install MongoDB and start service
    - Cloud: Create free cluster at [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)

5. **Configure environment variables**
    ```bash
    export MONGO_URI="your_mongodb_connection_string"
    ```

6. **Run the application**
    ```python
    python app.py
    ```

7. **Open browser** and navigate to `http://localhost:5000`

## License
MIT License

## Author
Elizabeth Kodjo

## Acknowledgments
- Flask documentation
- MongoDB documentation
- AWS Free Tier