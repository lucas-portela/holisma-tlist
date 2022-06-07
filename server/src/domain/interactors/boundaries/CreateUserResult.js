import User from '../../entities/User';

export class CreateUserResult {
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
    }
}
