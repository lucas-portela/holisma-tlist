import User from '../../entities/User';

export class ListProjectsRequest {
    constructor() {
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
