/*!
 *
 * YDITS Accounts
 *
 * Copyright (C) 2024-2026 よね/Yone
 *
 * https://github.com/YDITS/YDITS-Accounts
 *
 */

import { FirebaseCore } from "../libs/firebase/firebase-core.mjs";
import { FirebaseConfig } from "../libs/firebase/firebase-config.mjs";
import { ConsoleManager } from "../libs/console-manager/console-manager.mjs";

/**
 * YDITS Account のクライアント管理
 * Firebase の管理
 */
export class YditsAccountsClient {
    /**
     * コールバック関数
     * @type {{ onLoginError: Function }}
     */
    #callbacks = {};


    /**
     * Firebase
     * @type {FirebaseCore | null}}
     */
    #firebase = null;


    /**
     * Console Manager
     * @type {ConsoleManager | null}
     */
    #consoleManager = null;


    /**
     * Firebase をイニシャライズする
     * @param {{}} config
     * @returns {void}
     */
    #initializeFirebase(config) {
        const _config = new FirebaseConfig(config)
        this.#firebase = new FirebaseCore(_config);
    }


    /**
     * Console Manager をイニシャライズする
     */
    #initializeConsoleManager() {
        this.#consoleManager = new ConsoleManager();
    }


    /**
     * ログインエラー時の処理
     * @param {string} errorMessage
     */
    #onLoginError(errorMessage) {
        this.#callbacks.onLoginError(errorMessage);
    }


    /**
     * @param {{
     *     config: {},
     *     onLoginError: Function,
     * }}
     */
    constructor({
        config,
        onLoginError,
    }) {
        this.#callbacks = { onLoginError };
        this.#initializeConsoleManager();
        this.#initializeFirebase(config);
    }


    /**
     * ログインする
     * @param {{
     *     email: string,
     *     password: string,
     * }}
     */
    login({ email, password }) {
        let user;

        this.#firebase.signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                user = userCredential.user;
                console.debug(user);
            })
            .catch((error) => {
                console.error(error);
                this.#onLoginError(error.message);
            });
    }


    /**
     * サインアップする
     * @param {{
     *     email: string,
     *     password: string,
     * }}
     */
    signup({ email, password }) {
        let user;

        this.#firebase.createUserWithEmailAndPassword(this.#firebase.auth, email, password)
            .then((userCredential) => {
                user = userCredential.user;
                console.debug(user);
            })
            .catch((error) => {
                console.error(error);
                this.#onLoginError(error.message);
            });
    }


    singupWithGitHub() {
        this.#firebase.signInWithPopup(this.#firebase.auth, this.#firebase.githubAuthProvider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = this.#firebase.githubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = this.#firebase.githubAuthProvider.credentialFromError(error);
                // ...
            });
    }
}
