import React from 'react';
import "./TodoTask.css";

class TodoTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",       // input text
      tasks: []       // array to store tasks
    };
  }

  componentDidMount() {
    // Load tasks from localStorage when component mounts
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      this.setState({ tasks: storedTasks });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Save tasks to localStorage whenever tasks change
    if (prevState.tasks !== this.state.tasks) {
      localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
    }
  }

  // Update state when typing
  handleChange = (e) => {
    this.setState({ task: e.target.value });
  }

  // Add task to array
  addTask = () => {
    if (this.state.task.trim() === "") {
      alert("Task name cannot be empty");
      return;
    }
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, prevState.task],
      task: ""
    }));
  }

  // Delete task from array
  deleteTask = (index) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((_, i) => i !== index)
    }));
  }

  render() {
    return (
      <div className="todo-container">
        <h1>📝 Todo List</h1>

        <div className="input-container">
          <input
            type="text"
            placeholder="Enter task name"
            required
            autoFocus
            value={this.state.task}
            onChange={this.handleChange}
          />
          <button type="button" onClick={this.addTask}>
            Add Task
          </button>
        </div>

        <ul>
          {this.state.tasks.map((t, index) => (
            <li key={index} className="task-item">
              <span>{t}</span>
              <button onClick={() => this.deleteTask(index)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoTasks;
