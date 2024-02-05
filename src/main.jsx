import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBPP67-2u1_WACBFuK040jtpw3l36v2qQw",
    authDomain: "intesa-vincente-7dbac.firebaseapp.com",
    databaseURL: "https://intesa-vincente-7dbac-default-rtdb.europe-west1.firebasedatabase.app", // URL corretto
    projectId: "intesa-vincente-7dbac",
    storageBucket: "intesa-vincente-7dbac.appspot.com",
    messagingSenderId: "804731584845",
    appId: "1:804731584845:web:4707d386bd961d32253704"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
