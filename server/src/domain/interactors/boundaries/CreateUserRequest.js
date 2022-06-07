import User from '../../entities/User';

export class CreateUserRequest {
    constructor() {
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
        this.password = undefined;

        /**
         * @type {string}
         * @public
         */
        this.i18n = undefined;
    }
}
