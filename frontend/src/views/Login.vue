<template>
  <div class="login-container">
    <h1 class="page-title">Welcome to Da Notes App</h1>

    <div class="login-card">
      <h1 class="login-title" v-if="!isOtpStep">Sign In</h1>
      <h1 class="login-title" v-else>Check Your Email</h1>

      <div v-if="!isOtpStep">
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
      </div>

      <div v-else>
        <p>
          A verification link has been sent to your email. Please click the link
          to complete your login.
        </p>
        <button @click="resendLink" class="login-button">Resend Email</button>
      </div>

      <p class="signup-link" v-if="!isOtpStep">
        Don't have an account?
        <router-link to="/signup">Sign Up</router-link>
      </p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { app } from "../firebase";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      isOtpStep: false,
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      const auth = getAuth(app);

      try {
        // Step 1: Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        console.log("User signed in:", userCredential.user);

        // Step 2: Send email verification link for 2FA
        await this.sendVerificationEmail(userCredential.user.email);
        this.isOtpStep = true;
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    async sendVerificationEmail(email) {
      const auth = getAuth(app);
      const actionCodeSettings = {
        url: window.location.href, // Set the URL where the user should be redirected after verifying
        handleCodeInApp: true, // Ensures the email link is handled in-app
      };

      try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        console.log("Verification email sent to:", email);

        // Save the email in localStorage to complete the login later
        localStorage.setItem("emailForSignIn", email);
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    async verifySignIn() {
      const auth = getAuth(app);
      const email = localStorage.getItem("emailForSignIn");

      if (isSignInWithEmailLink(auth, window.location.href) && email) {
        try {
          // Complete the sign-in process
          const result = await signInWithEmailLink(
            auth,
            email,
            window.location.href
          );
          console.log("Email verified and user signed in:", result.user);

          // Clear localStorage
          localStorage.removeItem("emailForSignIn");

          // Redirect to dashboard
          const redirectPath = this.$route.query.redirect || "./dashboard";
          this.$router.push(redirectPath);
        } catch (error) {
          this.errorMessage = error.message;
        }
      } else {
        this.errorMessage = "Invalid or expired verification link.";
      }
    },
    resendLink() {
      this.sendVerificationEmail(this.email);
    },
  },
  mounted() {
    // Check if the URL contains the email link for verification
    this.verifySignIn();
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
