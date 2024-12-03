<template>
  <div class="login-container">
    <h1 class="page-title">Welcome to Da Notes App</h1>

    <div class="login-card">
      <h1 class="login-title">Sign In</h1>
      <div class="input-group">
        <input
          type="email"
          placeholder="Email"
          v-model="email"
          class="input-field"
        />
      </div>
      <div class="input-group">
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          class="input-field"
        />
      </div>
      <button @click="login" class="login-button">Sign In</button>
      <p class="signup-link">
        Don't have an account?
        <router-link to="/signup">Sign Up</router-link>
      </p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
// Import necessary functions from Firebase Auth module
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      const auth = getAuth(app); // Pass your Firebase app instance
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          console.log("User signed in:", userCredential.user);
          const redirectPath = this.$route.query.redirect || "./dashboard";
          this.$router.push(redirectPath);
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    },
  },
};
</script>

<style scoped>
/* Apple-like design styles */

.login-container {
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  justify-content: center;
  align-items: center; /* Center elements horizontally */
  min-height: 100vh;
  background-color: #f5f5f7;
  padding: 20px; /* Ensures proper spacing on smaller screens */
  box-sizing: border-box;
}

.page-title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 40px; /* Space between title and signup card */
  text-align: center;
}

.login-card {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
}

.login-title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 30px;
  text-align: center;
}

.input-group {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 12px;
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

.login-button {
  width: 100%;
  padding: 15px;
  font-size: 17px;
  background-color: #0071e3;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 10px;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: #005bb5;
}

.signup-link {
  margin-top: 20px;
  text-align: center;
  font-size: 15px;
  color: #6e6e73;
}

.signup-link a {
  color: #0071e3;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}

.error-message {
  color: #d93025; /* Red color for errors */
  text-align: center;
  margin-top: 10px;
}
</style>
