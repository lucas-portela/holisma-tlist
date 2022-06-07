import User from '../../entities/User';

export class AuthenticateUserResult {
    constructor() {
        /**
         * @type {string}
         * @public
         */
        this.id = undefined;

        /**
         * @type {string}
         * @public
         */
        this.name = undefined;

        /**
         * @type {string}
         * @public
         */
        this.email = undefined;

        /**
         * @type {string}
         * @public
         */
        this.token = undefined;
    }
}
