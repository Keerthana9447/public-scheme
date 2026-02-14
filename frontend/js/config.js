// config.js

// Detect if running locally or in production
const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";

// Set API base URL accordingly
const API_BASE = isLocal
  ? "http://127.0.0.1:8000"   // Local FastAPI backend
  : "https://public-scheme-navigator.vercel.app";  // Deployed backend URL

export { API_BASE };
