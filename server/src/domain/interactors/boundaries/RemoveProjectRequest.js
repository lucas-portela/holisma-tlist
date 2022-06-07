import User from '../../entities/User';

export class RemoveProjectRequest {
    constructor() {
        /**
         * @type {string}
         * @public
         */
        this.projectId = undefined;

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
