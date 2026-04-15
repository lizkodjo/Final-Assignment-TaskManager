from datetime import datetime
import os

from bson import ObjectId
from flask import Flask, jsonify, render_template, request
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()  # Get environment variable

# Create a Flask instance with 'name' argument
app = Flask(__name__)

# Create MongoDB connection (localhost for this app)
MONGO_URI = os.getenv("MONGO_URI", "MONGO_LOCAL")  # Environment variables
client = MongoClient(MONGO_URI)

# Create a databse and collection
db = client["task_manager_db"]
tasks_collection = db["tasks"]


# Homepage
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    """Get all tasks"""
    tasks = list(tasks_collection.find({}).sort("created_at", -1))
    for task in tasks:
        task["_id"] = str(task["_id"])  # Convert ObjectId to string
    return jsonify(tasks)


@app.route("/api/tasks", methods=["POST"])
def add_task():
    """Add a new task"""
    try:
        task_data = request.json
        task = {
            "title": task_data.get("title"),
            "description": task_data.get("description", ""),
            "status": task_data.get("status", "pending"),
            "priority": task_data.get("priority", "medium"),
            "created_at": datetime.now(),
            "updated_at": datetime.now(),
        }
        result = tasks_collection.insert_one(task)  # Add task to database
        task["_id"] = str(result.inserted_id)
        return jsonify(task), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/tasks/<task_id>", methods=["PUT"])
def update_task(task_id):
    """Update a task"""
    try:
        task_data = request.json
        update_data = {
            "title": task_data.get("title"),
            "description": task_data.get("description"),
            "status": task_data.get("status"),
            "priority": task_data.get("priority"),
            "updated_at": datetime.now(),
        }

        # Remove empty (None) values
        update_data = {k: v for k, v in update_data.items() if v is not None}

        result = tasks_collection.update_one(
            {"_id": ObjectId(task_id)}, {"$set": update_data}
        )

        if result.modified_count > 0:
            return jsonify({"message": "Task updated successfully."})
        return jsonify({"error": "Task not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    """Delete a task"""
    try:
        result = tasks_collection.delete_one({"_id": ObjectId(task_id)})

        if result.deleted_count > 0:
            return jsonify({"message": "Task deleted successfully"})
        return jsonify({"error": "Task not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/tasks/<task_id>/toggle", methods=["PATCH"])
def toggle_task_status(task_id):
    """Toggle task between pending and completed"""
    try:
        task = tasks_collection.find_one({"_id": ObjectId(task_id)})
        if task:
            new_status = "completed" if task.get("status") == "pending" else "pending"
            tasks_collection.update_one(
                {"_id": ObjectId(task_id)},
                {"$set": {"status": new_status, "updated_at": datetime.now()}},
            )
            return jsonify({"status": new_status})
        return jsonify({"error": "Task not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
