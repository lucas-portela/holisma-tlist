import { BaseEntity } from './BaseEntity';
import Task from './Task';

export default class Project extends BaseEntity {
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
        this.userId = undefined;

        /**
         * @type {?Task[]}
         * @public
         */
        this.tasks = undefined;
    }
}
