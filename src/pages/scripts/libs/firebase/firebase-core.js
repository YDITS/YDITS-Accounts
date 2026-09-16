/*!
 *
 * YDITS Accounts
 *
 * Copyright (C) 2024-2026 よね/Yone
 *
 * https://github.com/YDITS/YDITS-Accounts
 *
 */

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
import { FirebaseConfig } from "./firebase-config.js";

export class FirebaseCore {
    get app() {
        return this.#app;
    }

    /**
     * @type {*}
     */
    #app = null;

    get auth() {
        return this.#auth;
    }

    /**
     * @type {*}
     */
    #auth = null;

    get githubAuthProvider() {
        return this.#githubAuthProvider;
    }

    /**
     * @type {*}
     */
    #githubAuthProvider = null;

    /**
     * @type {*}
     */
    #analytics = null;

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

    /**
     * Firebase アプリをイニシャライズする
     * @param {{
     *    apiKey: string,
    *     authDomain: string,
    *     projectId: string,
    *     storageBucket: string,
    *     messagingSenderId: string,
    *     appId: string,
    *     measurementId: string,
    * } | null} config
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
}
