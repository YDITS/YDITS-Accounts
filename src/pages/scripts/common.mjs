
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCfltAjH4jFhJbn4wKmgTMIdt25rqkMEHE",
    authDomain: "ydits-accounts-927aa.firebaseapp.com",
    projectId: "ydits-accounts-927aa",
    storageBucket: "ydits-accounts-927aa.firebasestorage.app",
    messagingSenderId: "310063181312",
    appId: "1:310063181312:web:fa115c3adc417073b3b2e5",
    measurementId: "G-YEPZYDD54V",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

(() => {
    console.log(
        "%cWARNING!\n%cUsing this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS.Do not enter or paste code that you do not understand.",
        "font-size: 32px; color: red; background-color: yellow;",
        "font-size: 24px;"
    );
    console.log(
        "%c警告!\n%cこのコンソールを使用すると、攻撃者があなたになりすまし、Self-XSSと呼ばれる攻撃を使ってあなたの情報を盗み出す可能性があります。理解できないコードを入力したり、貼り付けたり絶対にしないでください。",
        "font-size: 32px; color: red; background-color: yellow;",
        "font-size: 24px;"
    );

    let loginSubmitButtomElement;
    let signupSubmitButtomElement;
    let errorMessageElement;

    document.addEventListener("DOMContentLoaded", () => initPage());

    function initPage() {
        console.log("Initializing page...");

        loginSubmitButtomElement = document.getElementById("loginSubmitButton");
        signupSubmitButtomElement =
            document.getElementById("signupSubmitButton");
        errorMessageElement = document.getElementById("loginFormErrorMessage");

        try {
            loginSubmitButtomElement.addEventListener("click", () =>
                onClickLoginSubmitButton()
            );
        } catch (error) {
            console.error(error);
        }

        try {
            signupSubmitButtomElement.addEventListener("click", () =>
                onClickSignupSubmitButton()
            );
        } catch (error) {
            console.error(error);
        }

        console.log(
            "%cWARNING!\n%cUsing this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS.Do not enter or paste code that you do not understand.",
            "font-size: 32px; color: red; background-color: yellow;",
            "font-size: 24px; color: unset; backgroun-color: unset;"
        );
        console.log(
            "%c警告!\n%cこのコンソールを使用すると、攻撃者があなたになりすまし、Self-XSSと呼ばれる攻撃を使ってあなたの情報を盗み出す可能性があります。理解できないコードを入力したり、貼り付けたり絶対にしないでください。",
            "font-size: 32px; color: red; background-color: yellow;",
            "font-size: 24px;"
        );
    }

    function onClickLoginSubmitButton() {
        console.log("Clicked login button.");

        errorMessage("");

        const loginFormEmailElement = document.getElementById("loginFormEmail");
        const loginFormPasswordElement =
            document.getElementById("loginFormPassword");
        const email = loginFormEmailElement.value;
        const password = loginFormPasswordElement.value;

        if (email === "" || password === "") {
            emptyForm();
            return;
        }

        login(email, password);
    }

    function onClickSignupSubmitButton() {
        console.log("Clicked signup button.");

        errorMessage("");

        const loginFormEmailElement = document.getElementById("loginFormEmail");
        const loginFormPasswordElement =
            document.getElementById("loginFormPassword");
        const email = loginFormEmailElement.value;
        const password = loginFormPasswordElement.value;

        if (email === "" || password === "") {
            emptyForm();
            return;
        }

        signup(email, password);
    }

    function login(email, password) {
        let user;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                user = userCredential.user;
                console.debug(user);
            })
            .catch((error) => {
                console.error(error);
                onLoginError(error.message);
            });
    }

    function signup(email, password) {
        let user;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                user = userCredential.user;
                console.debug(user);
            })
            .catch((error) => {
                console.error(error);
                onLoginError(error.message);
            });
    }

    function emptyForm() {
        errorMessage("Enter an email and a password");
    }

    function errorMessage(text) {
        errorMessageElement.innerText = text;
    }

    function onLoginError(errorMessage) {
        console.debug(errorMessage);

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

            case "Firebase: Error (auth/email-already-in-use).":
                errorMessageElement.innerText = "Email already in use";
                break;

            case "Firebase: Password should be at least 6 characters (auth/weak-password).":
                errorMessageElement.innerText =
                    "Password should be at least 6 characters";
                break;

            default:
                errorMessageElement.innerText = "Unknown error";
                break;
        }
    }
})();
