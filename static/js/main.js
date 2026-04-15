let currentFilter = "all";

// Fetch and display tasks
async function fetchTasks() {
  try {
    const response = await fetch("/api/tasks");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const tasks = await response.json();
    displayTasks(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    showError("Failed to load tasks. Please refresh the page.");
  }
}

// Display tasks based on filter
function displayTasks(tasks) {
  const tasksList = document.getElementById("tasksList");
  const filteredTasks =
    currentFilter === "all"
      ? tasks
      : tasks.filter((task) => task.status === currentFilter);

  if (filteredTasks.length === 0) {
    tasksList.innerHTML =
      '<div class="no-tasks">No tasks found. Add a new task!</div>';
    return;
  }

  tasksList.innerHTML = filteredTasks
    .map(
      (task) => `
                <div class="task-card ${task.priority} ${task.status === "completed" ? "completed" : ""}" data-id="${task._id}">
                    <div class="task-header">
                        <h3>${escapeHtml(task.title)}</h3>
                        <span class="priority-badge ${task.priority}">${task.priority}</span>
                    </div>
                    ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ""}
                    <div class="task-footer">
                        <span class="task-status ${task.status}">${task.status}</span>
                        <div class="task-actions">
                            <button onclick="toggleTask('${task._id}')" class="toggle-btn">
                                ${task.status === "pending" ? "✓ Complete" : "↺ Reopen"}
                            </button>
                            <button onclick="deleteTask('${task._id}')" class="delete-btn">🗑 Delete</button>
                        </div>
                    </div>
                </div>
            `,
    )
    .join("");
}

// Add new task
document.getElementById("taskForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const task = {
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDescription").value,
    priority: document.getElementById("taskPriority").value,
    status: "pending",
  };

  const submitButton = e.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = "Adding...";
  submitButton.disabled = true;

  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Task added:", result);

    // Reset form and refresh tasks
    document.getElementById("taskForm").reset();
    await fetchTasks();
    showSuccess("Task added successfully!");
  } catch (error) {
    console.error("Error adding task:", error);
    showError("Failed to add task. Please try again.");
  } finally {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
});

// Toggle task status
async function toggleTask(taskId) {
  try {
    const response = await fetch(`/api/tasks/${taskId}/toggle`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Task toggled:", result);
    await fetchTasks();
    showSuccess("Task status updated!");
  } catch (error) {
    console.error("Error toggling task:", error);
    showError("Failed to update task. Please try again.");
  }
}

// Delete task
async function deleteTask(taskId) {
  if (!confirm("Are you sure you want to delete this task?")) {
    return;
  }

  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Task deleted:", result);
    await fetchTasks();
    showSuccess("Task deleted successfully!");
  } catch (error) {
    console.error("Error deleting task:", error);
    showError("Failed to delete task. Please try again.");
  }
}

// Filter functionality
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    fetchTasks();
  });
});

// Helper function to escape HTML
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Show error message
function showError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "notification error";
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #f56565;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
            `;
  document.body.appendChild(errorDiv);
  setTimeout(() => errorDiv.remove(), 3000);
}

// Show success message
function showSuccess(message) {
  const successDiv = document.createElement("div");
  successDiv.className = "notification success";
  successDiv.textContent = message;
  successDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #48bb78;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
            `;
  document.body.appendChild(successDiv);
  setTimeout(() => successDiv.remove(), 3000);
}

// Add animation styles
const style = document.createElement("style");
style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
document.head.appendChild(style);

// Initial fetch
fetchTasks();

// Optional: Auto-refresh every 30 seconds
// setInterval(fetchTasks, 30000);
