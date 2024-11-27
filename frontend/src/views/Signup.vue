<template>
  <div class="signup-container">
    <!-- New Page Title -->
    <h1 class="page-title">Welcome to Da Notes App</h1>

    <div class="signup-card">
      <h2 class="signup-title">Create Account</h2>
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
      <button @click="signup" class="signup-button">Sign Up</button>
      <p class="login-link">
        Already have an account?
        <router-link to="/login">Sign In</router-link>
      </p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
// Import necessary functions from Firebase Auth module
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase"; // Adjust the path as needed

export default {
  name: "SignUpView",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    signup() {
      const auth = getAuth(app); // Pass your Firebase app instance
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          console.log("User created:", userCredential.user);
          // Optionally, redirect the user after successful sign-up
          this.$router.push("/dashboard");
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

.signup-container {
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  justify-content: center;
  align-items: center; /* Center elements horizontally */
  min-height: 100vh;
  background-color: #f5f5f7;
  padding: 20px; /* Ensures proper spacing on smaller screens */
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

.signup-card {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.signup-title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 28px; /* Reduced size since it's now a subtitle */
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

.signup-button {
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

.signup-button:hover {
  background-color: #005bb5;
}

.login-link {
  margin-top: 20px;
  text-align: center;
  font-size: 15px;
  color: #6e6e73;
}

.login-link a {
  color: #0071e3;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

.error-message {
  color: #d93025; /* Red color for errors */
  text-align: center;
  margin-top: 10px;
}
</style>
