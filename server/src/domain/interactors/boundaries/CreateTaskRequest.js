import User from '../../entities/User';

export class CreateTaskRequest {
    constructor() {
        /**
         * @type {string}
         * @public
         */
        this.description = undefined;

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
