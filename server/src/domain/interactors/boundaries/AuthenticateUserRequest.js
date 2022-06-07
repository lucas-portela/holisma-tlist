import User from '../../entities/User';

export class AuthenticateUserRequest {
    constructor() {
        /**
         * @type {string}
         * @public
         */
        this.email = undefined;

        /**
         * @type {string}
         * @public
         */
        this.password = undefined;

        /**
         * @type {string}
         * @public
         */
        this.i18n = undefined;
    }
}
