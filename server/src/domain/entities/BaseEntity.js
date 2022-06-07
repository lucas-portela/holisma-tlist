export class BaseEntity {
    constructor() {
        /**
         * @type {?string}
         * @public
         */
        this.id = null;

        /**
         * @type {?Date}
         * @public
         */
        this.createdAt = null;

        /**
         * @type {?Date}
         * @public
         */
        this.updatedAt = null;

        /**
         * @type {?Date}
         * @public
         */
        this.removedAt = null;
    }
}
