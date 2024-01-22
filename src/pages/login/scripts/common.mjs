
"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBHNOmPRFD-G3zj7h5jW7blRJ385EBETLg",
    authDomain: "ydits-accounts.firebaseapp.com",
    projectId: "ydits-accounts",
    storageBucket: "ydits-accounts.appspot.com",
    messagingSenderId: "680261956411",
    appId: "1:680261956411:web:8c8e99dbab5dfa6d1cbd1e",
    measurementId: "G-5KJC78542S"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

(() => {
    document.addEventListener("DOMContentLoaded", () => initPage());


    function initPage() {
        const loginSubmitButtomElement = document.getElementById("loginSubmitButton");
        loginSubmitButtomElement.addEventListener("click", () => onClickLoginSubmitButton());
    }


    function onClickLoginSubmitButton() { login(); }


    function login() {
        const loginFormEmailElement = document.getElementById("loginFormEmail");
        const loginFormPasswordElement = document.getElementById("loginFormPassword");
        const email = loginFormEmailElement.value;
        const password = loginFormPasswordElement.value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.debug(user);
            })
            .catch((error) => {
                console.error(error);
                onLoginError(error.message);
            });
    }


    function onLoginError(errorMessage) {
        console.debug(errorMessage)
        const errorMessageElement = document.getElementById("loginFormErrorMessage");

        switch (errorMessage) {
            case "Firebase: Error (auth/invalid-email).":
                errorMessageElement.innerText = "Invalid email";
                break;

            case "Firebase: Error (auth/missing-password).":
                errorMessageElement.innerText = "Missing password";
                break;

            case "Firebase: Error (auth/invalid-login-credentials).":
                errorMessageElement.innerText = "Invalid login credentials";
                break;

            default:
                errorMessageElement.innerText = "Unknown error";
                break;
        }
    }
})();