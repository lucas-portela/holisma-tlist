import { BaseEntity } from './BaseEntity';

export default class Task extends BaseEntity {
    constructor() {
        super();

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
         * @type {?Date}
         * @public
         */
        this.doneAt = undefined;
    }
}
