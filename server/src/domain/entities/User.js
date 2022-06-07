import { BaseEntity } from './BaseEntity';

export default class User extends BaseEntity {
    constructor() {
        super();

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
    }
}
