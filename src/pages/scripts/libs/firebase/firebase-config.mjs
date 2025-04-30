export class FirebaseConfig {
    /**
     * @param {{
     *     apiKey: string,
     *     authDomain: string,
     *     projectId: string,
     *     storageBucket: string,
     *     messagingSenderId: string,
     *     appId: string,
     *     measurementId: string,
     * }} config
     */
    constructor(config) {
        if (typeof config.apiKey !== "string") {
            throw new TypeError("Parameter `apiKey` is must be string.");
        }

        if (typeof config.authDomain !== "string") {
            throw new TypeError("Parameter `authDomain` is must be string.");
        }

        if (typeof config.projectId !== "string") {
            throw new TypeError("Parameter `projectId` is must be string.");
        }

        if (typeof config.storageBucket !== "string") {
            throw new TypeError("Parameter `storageBucket` is must be string.");
        }

        if (typeof config.messagingSenderId !== "string") {
            throw new TypeError("Parameter `messagingSenderId` is must be string.");
        }

        if (typeof config.appId !== "string") {
            throw new TypeError("Parameter `appId` is must be string.");
        }

        if (typeof config.measurementId !== "string") {
            throw new TypeError("Parameter `measurementId` is must be string.");
        }

        this.config = config;
    }


    /**
     * @type {{
     *     apiKey: string,
    *     authDomain: string,
    *     projectId: string,
    *     storageBucket: string,
    *     messagingSenderId: string,
    *     appId: string,
    *     measurementId: string,
    * } | null}
     */
    config = null;
}