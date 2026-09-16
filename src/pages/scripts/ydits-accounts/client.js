/*!
 *
 * YDITS Accounts
 *
 * Copyright (C) 2024-2026 よね/Yone
 *
 * https://github.com/YDITS/YDITS-Accounts
 *
 */

import { FirebaseCore } from "../libs/firebase/firebase-core.js";
import { FirebaseConfig } from "../libs/firebase/firebase-config.js";
import { ConsoleManager } from "../libs/console-manager/console-manager.js";

/**
 * YDITS Account のクライアント管理
 * Firebase の管理
 */
export class YditsAccountsClient {
    /**
     * コールバック関数
     * @type {{ onLoginError: (errorMessage: string) => void }}
     */
    #callbacks;

    /**
     * Firebase
     * @type {FirebaseCore}
     */
    #firebase;

    /**
     * Console Manager
     * @type {ConsoleManager | null}
     */
    #consoleManager = null;

    /**
     * @param {{
     *     config: {},
     *     onLoginError: (errorMessage: string) => void,
     * }}
     */
    constructor({
        config,
        onLoginError,
    }) {
        this.#callbacks = { onLoginError };
        this.#consoleManager = this.#initializeConsoleManager();
        this.#firebase = this.#initializeFirebase(config);
    }

    /**
     * ログインする
     * @param {{
     *     email: string,
     *     password: string,
     * }}
     * @returns {void}
     */
    login({ email, password }) {
        let user;


        this.#firebase.signInWithEmailAndPassword(this.#firebase.auth, email, password)
            .then((/** @type {unknown} */ userCredential) => {
                user = userCredential.user;
                console.debug(user);
            })
            .catch((/** @type {unknown} */ error) => {
                console.error(error);
                this.#onLoginError(error instanceof Error ? error.message : String(error));
            });
    }

    /**
     * サインアップする
     * @param {{
     *     email: string,
     *     password: string,
     * }}
     * @returns {void}
     */
    signup({ email, password }) {
        let user;

        this.#firebase.createUserWithEmailAndPassword(this.#firebase.auth, email, password)
            .then((/** @type {unknown} */ userCredential) => {
                user = userCredential.user;
                console.debug(user);
            })
            .catch((/** @type {unknown} */ error) => {
                console.error(error);
                this.#onLoginError(error instanceof Error ? error.message : String(error));
            });
    }

    /**
     * Firebase をイニシャライズする
     * @param {any} config
     * @returns {FirebaseCore}
     */
    #initializeFirebase(config) {
        const _config = new FirebaseConfig(config)
        return new FirebaseCore(_config);
    }

    /**
     * Console Manager をイニシャライズする
     * @returns {ConsoleManager}
     */
    #initializeConsoleManager() {
        return new ConsoleManager();
    }

    /**
     * ログインエラー時の処理
     * @param {string} errorMessage
     * @returns {void}
     */
    #onLoginError(errorMessage) {
        this.#callbacks.onLoginError(errorMessage);
    }
}
