import { initializeApp } from 'firebase/app';

import { getAnalytics } from "firebase/analytics";

// Strict Security: Physical AI Digital Twin uses Environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy-api-key-for-google-challenge",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "crowdease-digital-twin.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "crowdease-digital-twin",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "crowdease-digital-twin.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-ABCDEFGHIJ"
};

// Initialize Firebase Real-time Operations API
const app = initializeApp(firebaseConfig);

// Initialize Google Analytics for Physical AI Traffic Monitoring
let analytics;
try {
  // Only initialize analytics if we are in a browser context where it's supported
  analytics = getAnalytics(app);
} catch (e) {
  console.warn("Analytics initialization skipped.", e);
}

export { app, analytics };
