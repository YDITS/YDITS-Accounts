/*!
 *
 * YDITS Accounts
 *
 * Copyright (C) 2024-2026 よね/Yone
 *
 * https://github.com/YDITS/YDITS-Accounts
 *
 */

export class ConsoleManager {
    constructor() {
        if (typeof window?.console !== "object") {
            throw new TypeError("window.console is not a object.");
        }

        this.#console = window?.console;
    }


    /**
     * @type {{
     *     language: {
     *         title: string,
     *         body: string,
     *     },
     * }}
     */
    static selfXSSWarnTexts = {
        "en": {
            title: "WARNING!",
            body: "Using this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS.Do not enter or paste code that you do not understand.",
        },
        "ja": {
            title: "警告!",
            body: "このコンソールを使用すると、攻撃者があなたになりすまし、Self-XSSと呼ばれる攻撃を使ってあなたの情報を盗み出す可能性があります。理解できないコードを入力したり、貼り付けたり絶対にしないでください。",
        },
    }


    static selfXSSWarnStyles = {
        title: "font-size: 32px; color: red; background-color: yellow;",
        body: "font-size: 24px;",
    }


    get console() {
        return this.#console;
    }


    /**
     * @type {window.console | null}
     */
    #console = null;


    /**
     * @returns {void}
     */
    showSelfXSSWarn() {
        console.log(
            `%c${ConsoleManager.selfXSSWarnTexts.en.title}\n%c${ConsoleManager.selfXSSWarnTexts.en.body}`,
            ConsoleManager.selfXSSWarnStyles.title,
            ConsoleManager.selfXSSWarnStyles.body,
        );
        console.log(
            `%c${ConsoleManager.selfXSSWarnTexts.ja.title}\n%c${ConsoleManager.selfXSSWarnTexts.ja.body}`,
            ConsoleManager.selfXSSWarnStyles.title,
            ConsoleManager.selfXSSWarnStyles.body,
        );
    }
}
