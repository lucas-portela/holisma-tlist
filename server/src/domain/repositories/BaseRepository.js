import { BaseEntity } from '../entities/BaseEntity';
import { AppContext } from '../AppContext';

export class BaseRepository {
    /**
     *
     * @param {AppContext} context
     * @param {string} collection
     */
    constructor(context, collection) {
        /**
         * @private
         */
        this._context = context;

        /**
         * @private
         */
        this._collection = collection;
    }

    /**
     *
     * @param {Record<string, any>} entity
     * @returns {Promise<BaseEntity  & Record<string, any>>}
     */
    async create(entity) {
        entity = { ...entity, createdAt: new Date() };
        /**
         * @type any
         */
        let result = await this._context.persistenceService.insert(
            this._collection,
            entity,
        );

        return result;
    }

    /**
     *
     * @param {Pick<BaseEntity, "id"> & Record<string, any>} entity
     * @returns {Promise<BaseEntity & Record<string, any>>}
     */
    async update(entity) {
        entity = { ...entity, updatedAt: new Date() };

        /**
         * @type any
         */
        let result = await this._context.persistenceService.update(
            this._collection,
            entity,
        );

        return result;
    }

    /**
     *
     * @param {string} id
     * @returns {Promise<BaseEntity & Record<string, any>>}
     */
    async findById(id) {
        /**
         * @type any
         */
        let result = await this._context.persistenceService.findById(
            this._collection,
            id,
        );

        return result;
    }

    /**
     *
     * @param {Record<string, any>} query
     * @returns {Promise<(BaseEntity & Record<string, any>)[]>}
     */
    async findAll(query) {
        /**
         * @type any
         */
        let result = await this._context.persistenceService.findAll(
            this._collection,
            query,
        );

        return result;
    }

    /**
     *
     * @param {string} id
     * @returns {Promise<boolean>}
     */
    async removeById(id) {
        return await this._context.persistenceService.removeById(
            this._collection,
            id,
        );
    }

    /**
     *
     * @param {Record<string, any>} query
     * @returns {Promise<number>}
     */
    async removeAll(query) {
        return await this._context.persistenceService.removeAll(
            this._collection,
            query,
        );
    }
}
