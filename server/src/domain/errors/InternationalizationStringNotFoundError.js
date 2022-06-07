export class InternationalizationStringNotFoundError extends Error {
    /**
     *
     * @param {string} code
     * @param {string} stringName
     */
    constructor(code, stringName) {
        super(
            `Internationalization string "${stringName}" not found in language code "${code}"!`,
        );
    }
}
