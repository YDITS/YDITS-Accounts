import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged,
    GithubAuthProvider,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { FirebaseConfig } from "./firebase-config.mjs";

export class FirebaseCore {
    /**
     * @param {FirebaseConfig} config
     */
    constructor(config) {
        if (!(config instanceof FirebaseConfig)) {
            throw new TypeError("Parameter `config` is must be FirebaseConfig.");
        }

        if (typeof config.config !== "object") {
            throw new TypeError("Parameter `config` is invailed.");
        }

        this.initializeApp(config.config);
    }


    get app() {
        return this.#app;
    }


    get auth() {
        return this.#auth;
    }


    get githubAuthProvider() {
        return this.#githubAuthProvider;
    }


    /**
     * Firebase アプリをイニシャライズする
     * @param {{}} config
     * @returns {void}
     */
    initializeApp(config) {
        this.#app = initializeApp(config);

        this.#analytics = getAnalytics(this.#app);
        this.#auth = getAuth(this.#app);

        this.#githubAuthProvider = new GithubAuthProvider();
        this.#githubAuthProvider.addScope('repo');
        this.#githubAuthProvider.setCustomParameters({
            'allow_signup': 'false',
        });

        this.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
        this.signInWithEmailAndPassword = signInWithEmailAndPassword;
        this.signInWithPopup = signInWithPopup;
    }


    /**
     * @type {*}
     */
    #app = null;


    /**
     * @type {*}
     */
    #analytics = null;


    /**
     * @type {*}
     */
    #auth = null;


    /**
     * @type {*}
     */
    #githubAuthProvider = null;
}