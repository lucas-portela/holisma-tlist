import { BaseEntity } from '../entities/BaseEntity';
import { AbstractMethodCalledError } from '../errors/AbstractMethodCalledError';

/**
 * @interface
 */
export class PersistenceService {
    /**
     *
     * @param {string} collectionName
     * @param {Record<string, any>} document
     * @returns {Promise<Record<string, any>>}
     */
    insert(collectionName, document) {
        throw new AbstractMethodCalledError();
    }

    /**
     * @param {string} collectionName
     * @param {Record<string, any>} document
     * @returns {Promise<Record<string, any>|null>}
     */
    update(collectionName, document) {
        throw new AbstractMethodCalledError();
    }

    /**
     *
     * @param {string} collectionName
     * @param {string} id
     * @returns {Promise<Record<string, any>|null>}
     */
    findById(collectionName, id) {
        throw new AbstractMethodCalledError();
    }

    /**
     * @param {string} collectionName
     * @param {Record<string, any>} query
     * @returns {Promise<Record<string, any>[]>}
     */
    findAll(collectionName, query) {
        throw new AbstractMethodCalledError();
    }

    /**
     * @param {string} collectionName
     * @param {Record<string, any>} query
     * @returns {Promise<number>}
     */
    removeAll(collectionName, query) {
        throw new AbstractMethodCalledError();
    }

    /**
     *
     * @param {string} collectionName
     * @param {string} id
     * @returns {Promise<boolean>}
     */
    removeById(collectionName, id) {
        throw new AbstractMethodCalledError();
    }
}
