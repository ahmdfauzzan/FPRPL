// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGEUw4cBAuK-aNLe7U4J-8JQKsiVd8lqU",
  authDomain: "finalrpl-50ec8.firebaseapp.com",
  databaseURL: "https://finalrpl-50ec8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "finalrpl-50ec8",
  storageBucket: "finalrpl-50ec8.appspot.com",
  messagingSenderId: "803550687533",
  appId: "1:803550687533:web:cafad49a861e1f892da3a4",
  measurementId: "G-PK4QYD12BG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
