<template>
  <div class="dashboard-container">
    <h1 class="page-title">Todo Dashboard</h1>

    <!-- Form to Add New Todo -->
    <div class="todo-form">
      <h2 class="section-title">Add a New Todo</h2>
      <div class="input-group">
        <input
          type="text"
          placeholder="Title"
          v-model="newTodo.title"
          class="input-field"
        />
      </div>
      <div class="input-group">
        <textarea
          placeholder="Content"
          v-model="newTodo.content"
          class="input-field textarea-field"
        ></textarea>
      </div>
      <button @click="createTodo" class="primary-button">Add Todo</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>

    <!-- Display Existing Todos -->
    <div class="todo-list">
      <h2 class="section-title">Your Todos</h2>
      <div v-if="todos.length">
        <div class="todo-item" v-for="todo in todos" :key="todo.id">
          <div class="todo-header">
            <h3 class="todo-title">{{ todo.title }}</h3>
            <small class="todo-date">{{ formatDate(todo.created_at) }}</small>
          </div>
          <p class="todo-content">{{ todo.content }}</p>
        </div>
      </div>
      <p v-else class="no-todos">You have no todos yet.</p>
    </div>
  </div>
</template>

<script>
import apiClient from "../axios.js"; // Import the Axios instance

export default {
  name: "DashboardView",
  data() {
    return {
      todos: [],
      newTodo: {
        title: "",
        content: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    // Fetch todos from the backend
    async fetchTodos() {
      try {
        const response = await apiClient.get("/todos/");
        this.todos = response.data;
      } catch (error) {
        this.errorMessage = "Error fetching todos.";
        console.error(error);
      }
    },
    // Create a new todo
    async createTodo() {
      if (!this.newTodo.title || !this.newTodo.content) {
        this.errorMessage = "Please provide both title and content.";
        return;
      }
      try {
        await apiClient.post("/todos/", this.newTodo);
        this.newTodo.title = "";
        this.newTodo.content = "";
        this.errorMessage = "";
        this.fetchTodos(); // Refresh the list
      } catch (error) {
        this.errorMessage = "Error creating todo.";
        console.error(error);
      }
    },
    // Format date
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
  created() {
    this.fetchTodos();
  },
};
</script>

<style scoped>
/* Apple-like design styles */

.dashboard-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f5f5f7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  color: #1d1d1f;
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 30px;
}

.todo-form {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 60px;
}

.input-group {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 14px;
  font-size: 17px;
  border: 1px solid #d2d2d7;
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s;
}

.input-field:focus {
  border-color: #0071e3;
}

.textarea-field {
  min-height: 100px;
  resize: vertical;
}

.primary-button {
  padding: 15px 30px;
  font-size: 17px;
  background-color: #0071e3;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.primary-button:hover {
  background-color: #005bb5;
}

.error-message {
  color: #d93025;
  margin-top: 15px;
}

.todo-list {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.todo-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 20px 0;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-title {
  font-size: 22px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
}

.todo-date {
  font-size: 14px;
  color: #6e6e73;
}

.todo-content {
  font-size: 17px;
  color: #1d1d1f;
  margin-top: 10px;
  line-height: 1.6;
}

.no-todos {
  font-size: 17px;
  color: #6e6e73;
  text-align: center;
  padding: 40px 0;
}
</style>
