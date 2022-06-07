import { AppContext } from '../../AppContext';
import { i18nKeys } from '../constants/I18nKeys';

export class UserValidator {
    /**
     *
     * @param {string} email
     * @param {AppContext} context
     * @param {string} i18n
     */
    static validateEmail(email, context, i18n) {
        const emailValidationRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(email ?? '').toLowerCase().match(emailValidationRegex))
            throw new Error(
                context.i18nService.get(i18n, i18nKeys.invalidEmail),
            );
    }

    /**
     *
     * @param {string} password
     * @param {AppContext} context
     * @param {string} i18n
     */
    static validatePassword(password, context, i18n) {
        // Validate password length to be at least 6
        if ((password ?? '').length < 6)
            throw new Error(
                context.i18nService.get(i18n, i18nKeys.invalidPassword),
            );
    }
}
