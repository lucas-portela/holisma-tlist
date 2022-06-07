import { InternationalizationStringNotFoundError } from '../errors/InternationalizationStringNotFoundError';

export class I18nService {
    constructor() {
        /**
         * @type {Record<string, Record<string, string>>}
         * @private
         */
        this._strings = {};
    }

    /**
     * @param {string} code
     * @param {Record<string, string>} strings
     */
    add(code, strings) {
        this._strings[code] = strings;
    }

    /**
     *
     * @param {string} code
     * @param {string} stringName
     * @param {string[]} [values]
     */
    get(code, stringName, values = []) {
        let stringValue = this._strings[code]?.[stringName];
        if (!stringName)
            throw new InternationalizationStringNotFoundError(code, stringName);

        values.forEach(
            (value, i) =>
                (stringValue = stringValue.replace(
                    new RegExp(`%${i + 1}%`, 'g'),
                    value,
                )),
        );

        return stringValue;
    }
}
