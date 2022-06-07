import User from '../../entities/User';

export class RemoveTaskRequest {
    constructor() {
        /**
         * @type {string}
         * @public
         */
        this.taskId = undefined;

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
