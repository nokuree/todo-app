//index.js

import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/Signup.vue";
import DashboardView from "../views/DashboardView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/dashboard",
    name: "DashboardView",
    component: DashboardView,
    meta: { requiresAuth: true }, // Add this line
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation Guard
const auth = getAuth(app);

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth) {
    // Check if the user is authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe to prevent multiple calls

      if (user) {
        // User is authenticated, proceed to route
        next();
      } else {
        // User is not authenticated, redirect to login page
        next({ path: "/login", query: { redirect: to.fullPath } });
      }
    });
  } else {
    // Route does not require authentication, proceed
    next();
  }
});

export default router;
