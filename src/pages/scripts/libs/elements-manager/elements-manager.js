/*!
 *
 * YDITS Accounts
 *
 * Copyright (C) 2024-2026 よね/Yone
 *
 * https://github.com/YDITS/YDITS-Accounts
 *
 */

export class ElementsManager {
    /**
     * キャッシュされた Elements
     */
    get elements() {
        return this.#elements;
    }

    /**
     * Element を取得する
     * キャッシュを使用せずに新しく取得します。
     * @param {string} selector
     * @returns {Element | undefined}
     */
    get(selector) {
        const element = document.querySelectorAll(selector);

        if (element[0] instanceof HTMLElement) {
            this.#elements[selector] = element[0];
            return element[0];
        }

        return undefined;
    }

    /**
     * Element を取得する
     * キャッシュを使用して取得します。
     * キャッシュがないときは新しく取得します。
     * @param {string} selector
     * @returns {Element | undefined}
     */
    getFromCache(selector) {
        let element = this.#elements[selector];

        if (!(element instanceof Array || element instanceof HTMLElement)) {
            element = this.get(selector);
        }

        return element;
    }

    /**
     * @type {Record<string, Element | undefined>}
     */
    #elements = {};
}
