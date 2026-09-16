/*!
 *
 * YDITS Accounts
 *
 * Copyright (C) 2024-2026 よね/Yone
 *
 * https://github.com/YDITS/YDITS-Accounts
 *
 */

import config from "./config.js";
import { ConsoleManager } from "./libs/console-manager/console-manager.js";
import { YditsAccountsClient } from "./ydits-accounts/client.js";
import { ElementsManager } from "./libs/elements-manager/elements-manager.js";

/**
 * Authページの管理
 * YDITS Accounts Client の管理
 * Elements Manager の管理
 * イベントリスナーの管理
 */
class AuthPage {
    /**
     * Console Manager
     * @type {ConsoleManager}
     */
    #consoleManager;

    /**
     * Elements Manager
     * @type {ElementsManager}
    */
    #elementsManager;

    /**
     * YDITS Accounts Client
     * @type {YditsAccountsClient}
     */
    #yditsAccountsClient;

    constructor() {
        if (!(document instanceof Document)) {
            throw new TypeError("window.document is not instance of Document");
        }

        this.#consoleManager = this.#initializeConsoleManager();
        this.#elementsManager = this.#initializeElementsManager();
        this.#yditsAccountsClient = this.#initializeYditsAccountsClient();
        this.#initializePage();
    }

    /**
     * Console Manager をイニシャライズする
     * @returns {ConsoleManager}
     */
    #initializeConsoleManager() {
        const consoleManager = new ConsoleManager();
        consoleManager.showSelfXSSWarn();
        return consoleManager;
    }

    /**
     * Elements Manager をイニシャライズする
     * @returns {ElementsManager}
     */
    #initializeElementsManager() {
        return new ElementsManager();
    }

    /**
     * YDITS Account Client をイニシャライズする
     * @returns {YditsAccountsClient}
     */
    #initializeYditsAccountsClient() {
        return new YditsAccountsClient({
            config: config.firebase,
            onLoginError: (errorMessage) => this.#onLoginError(errorMessage),
        })
    }

    /**
     * ログイン失敗時の処理
     * @param {string} errorMessage
     * @returns {void}
     */
    #onLoginError(errorMessage) {
        console.debug(errorMessage);
        switch (errorMessage) {
            case "Firebase: Error (auth/invalid-email).":
                this.#showErrorMessage("Invalid email");
                break;

            case "Firebase: Error (auth/missing-password).":
                this.#showErrorMessage("Missing password");
                break;

            case "Firebase: Error (auth/invalid-login-credentials).":
                this.#showErrorMessage("Invalid login credentials");
                break;

            case "Firebase: Error (auth/invalid-credential).":
                this.#showErrorMessage("Invalid credentials");
                break;

            case "Firebase: Error (auth/email-already-in-use).":
                this.#showErrorMessage("Email already in use");
                break;

            case "Firebase: Password should be at least 6 characters (auth/weak-password).":
                this.#showErrorMessage("Password should be at least 6 characters");
                break;

            default:
                this.#showErrorMessage("Unknown error");
                break;
        }
    }

    /**
     * ページをイニシャライズする
     * @returns {void}
     */
    #initializePage() {
        const loginSubmitButtonElement = this.#elementsManager.getFromCache(config.elements.loginSubmitButton);
        const signupSubmitButtonElement = this.#elementsManager.getFromCache(config.elements.signupSubmitButton);
        const signupWithGitHubButtonElement = this.#elementsManager.getFromCache(config.elements.signupWithGitHubButton);
        this.#elementsManager.getFromCache(config.elements.errorMessage);

        loginSubmitButtonElement instanceof HTMLElement && (
            loginSubmitButtonElement.addEventListener("click", () => this.#onLoginSubmitButtonClick())
        );

        signupSubmitButtonElement instanceof HTMLElement && (
            signupSubmitButtonElement.addEventListener("click", () => this.#onSignupSubmitButtonClick())
        );

        this.#consoleManager.showSelfXSSWarn();
    }

    /**
     * ログインボタンがクリックされたときの処理
     * @returns {void}
     */
    #onLoginSubmitButtonClick() {
        this.#showErrorMessage("");

        const loginFormEmailElement = document.getElementById("loginFormEmail");
        const loginFormPasswordElement =
            document.getElementById("loginFormPassword");
        const email = loginFormEmailElement.value;
        const password = loginFormPasswordElement.value;

        if (email === "" || password === "") {
            this.#onFormEmpty();
            return;
        }

        this.#yditsAccountsClient.login({ email, password });
    }

    /**
     * サインアップボタンがクリックされたときの処理
     * @returns {void}
     */
    #onSignupSubmitButtonClick() {
        this.#showErrorMessage("");

        const loginFormEmailElement = document.getElementById("loginFormEmail");
        const loginFormPasswordElement =
            document.getElementById("loginFormPassword");
        const email = loginFormEmailElement.value;
        const password = loginFormPasswordElement.value;

        if (email === "" || password === "") {
            this.#onFormEmpty();
            return;
        }

        this.#yditsAccountsClient.signup({ email, password });
    }

    /**
     * フォームが入力されていないときの処理
     * @returns {void}
     */
    #onFormEmpty() {
        this.#showErrorMessage("Enter an email and a password");
    }

    /**
     * @param {string} text
     */
    #showErrorMessage(text) {
        const $errorMessage = this.#elementsManager.getFromCache(config.elements.errorMessage);
        $errorMessage instanceof HTMLElement && ($errorMessage.innerText = text);
    }
}

new AuthPage();
