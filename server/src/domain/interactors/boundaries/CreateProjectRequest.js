import User from '../../entities/User';

export class CreateProjectRequest {
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
        this.userId = undefined;

        /**
         * @type {string}
         * @public
         */
        this.i18n = undefined;
    }
}
