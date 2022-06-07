import User from '../../entities/User';

export class EditTaskRequest {
    constructor() {
        /**
         * @type {?string}
         * @public
         */
        this.description = undefined;

        /**
         * @type {?Date}
         * @public
         */
        this.doneAt = undefined;

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
