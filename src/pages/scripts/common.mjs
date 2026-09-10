/*!
 *
 * YDITS Accounts
 *
 * Copyright (C) 2024-2026 よね/Yone
 *
 * https://github.com/YDITS/YDITS-Accounts
 *
 */

import config from "./config.json" with { type: "json" };
import { safecall } from "./libs/safecaller/safecaller.mjs";
import { ConsoleManager } from "./libs/console-manager/console-manager.mjs";
import { YditsAccountsClient } from "./ydits-accounts/client.mjs";
import { ElementsManager } from "./libs/elements-manager/elements-manager.mjs";

/**
 * Authページの管理
 * YDITS Accounts Client の管理
 * Elements Manager の管理
 * イベントリスナーの管理
 */
class AuthPage {
    constructor() {
        if (!(window?.document instanceof Document)) {
            throw new TypeError("window.document is not instance of Document");
        }

        this.#initializeConsoleManager();
        this.#initializeElementsManager();
        this.#initializeYditsAccountsClient();
        this.#setupEventListeners();
    }


    /**
     * Console Manager
     * @type {ConsoleManager | null}
     */
    #consoleManager = null;


    /**
     * YDITS Accounts Client
     * @type {YditsAccountsClient | null}
     */
    #yditsAccountsClient = null;


    /**
     * Elements Manager
     * @type {ElementsManager | null}
     */
    #elementsManager = null;


    /**
     * Console Manager をイニシャライズする
     */
    #initializeConsoleManager() {
        this.#consoleManager = new ConsoleManager();
        this.#consoleManager.showSelfXSSWarn();
    }


    /**
     * YDITS Account Client をイニシャライズする
     * @returns {void}
     */
    #initializeYditsAccountsClient() {
        this.#yditsAccountsClient = new YditsAccountsClient({
            config: config.firebase,
            onLoginError: () => this.#onLoginError(),
        })
    }


    /**
     * ログイン失敗時の処理
     * @returns {void}
     */
    #onLoginError(errorMessage) {
        const errorMessageElement = this.#elementsManager.getFromCache(config.elements.errorMessage);

        switch (errorMessage) {
            case "Firebase: Error (auth/invalid-email).":
                this.#errorMessage("Invalid email");
                break;

            case "Firebase: Error (auth/missing-password).":
                this.#errorMessage("Missing password");
                break;

            case "Firebase: Error (auth/invalid-login-credentials).":
                this.#errorMessage("Invalid login credentials");
                break;

            case "Firebase: Error (auth/email-already-in-use).":
                this.#errorMessage("Email already in use");
                break;

            case "Firebase: Password should be at least 6 characters (auth/weak-password).":
                this.#errorMessage("Password should be at least 6 characters");
                break;

            default:
                this.#errorMessage("Unknown error");
                break;
        }
    }


    /**
     * Elements Manager をイニシャライズする
     * @returns {void}
     */
    #initializeElementsManager() {
        this.#elementsManager = new ElementsManager();
    }


    /**
     * イベントリスナーをセットアップする
     * @returns {void}
     */
    #setupEventListeners() {
        window.document.addEventListener("DOMContentLoaded", () => this.#initializePage());
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

        safecall(() => loginSubmitButtonElement.addEventListener("click", () => this.#onLoginSubmitButtonClick()));
        safecall(() => signupSubmitButtonElement.addEventListener("click", () => this.#onSignupSubmitButtonClick()));
        safecall(() => signupWithGitHubButtonElement.addEventListener("click", () => this.#onSignupWithGitHubButtonClick()));

        this.#consoleManager.showSelfXSSWarn();
    }


    /**
     * ログインボタンがクリックされたときの処理
     * @returns {void}
     */
    #onLoginSubmitButtonClick() {
        this.#errorMessage("");

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
        this.#errorMessage("");

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
     * GitHubサインアップボタンがクリックされたときの処理
     * @returns {void}
     */
    #onSignupWithGitHubButtonClick() {
        this.#yditsAccountsClient.signupWithGitHub();
    }


    #onFormEmpty() {
        this.#errorMessage("Enter an email and a password");
    }


    #errorMessage(text) {
        this.#elementsManager.getFromCache(config.elements.errorMessage).innerText = text;
    }
}


new AuthPage();
