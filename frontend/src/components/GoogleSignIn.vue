<template>
  <div>
    <button @click="googleSignIn" class="google-signin-button">
      Sign in with Google
    </button>
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase";

export default {
  name: "GoogleSignIn",
  methods: {
    async googleSignIn() {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();

      try {
        const result = await signInWithPopup(auth, provider);
        console.log("User signed in with Google:", result.user);

        // Redirect or perform any post-login actions
        const redirectPath = this.$route.query.redirect || "./dashboard";
        this.$router.push(redirectPath);
      } catch (error) {
        console.error("Google Sign-In error:", error.message);
      }
    },
  },
};
</script>

<style scoped>
.google-signin-button {
  background-color: #4285f4;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.google-signin-button:hover {
  background-color: #357ae8;
}
</style>
