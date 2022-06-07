import { reject } from 'bcrypt/promises';
import Datastore from 'nedb';
import { PersistenceService } from '../domain/ports/PersistenceService';

/**
 * @implements PersistenceService
 */
export class NeDBPersistenceService {
    constructor() {
        /**
         * @type {Record<string, Datastore>}
         */
        this._dbs = {};
    }

    /**
     *
     * @param {string} collectionName
     */
    _getCollection(collectionName) {
        this._dbs[collectionName] =
            this._dbs[collectionName] ||
            new Datastore({
                filename: `database/${collectionName}.nedb`,
                autoload: true,
            });

        return this._dbs[collectionName];
    }

    /**
     *
     * @param {Record<string, any>|null} document
     */
    _normalizeDocument(document) {
        if (!document) return null;

        document = { ...document };
        if (document._id) document.id = document._id;
        delete document._id;

        return document;
    }

    /**
     *
     * @param {Record<string, any>|null} document
     */
    _denormalizeDocument(document) {
        if (!document) return null;

        document = { ...document };
        if (document.id) document._id = document.id;
        delete document.id;

        return document;
    }

    /**
     *
     * @param {string} collectionName
     * @param {Record<string, any>} document
     */
    async insert(collectionName, document) {
        const collection = this._getCollection(collectionName);
        document = await new Promise((resolve, reject) =>
            collection.insert(document, (err, doc) => {
                if (err) reject(err);
                else resolve(doc);
            }),
        );
        return this._normalizeDocument(document);
    }

    /**
     *
     * @param {string} collectionName
     * @param {Record<string, any>} document
     * @returns {Promise<Record<string, any>|null>}
     */
    async update(collectionName, document) {
        const collection = this._getCollection(collectionName);
        document = this._denormalizeDocument(document);
        document = await new Promise((resolve, reject) =>
            collection.update(
                { _id: document._id },
                { $set: document },
                {
                    returnUpdatedDocs: true,
                },
                (err, _, docs) => {
                    if (err) reject(err);
                    // @ts-ignore
                    else resolve(docs);
                },
            ),
        );

        return this._normalizeDocument(document);
    }

    /**
     *
     * @param {string} collectionName
     * @param {string} id
     * @returns {Promise<Record<string, any>|null>}
     */
    async findById(collectionName, id) {
        const collection = this._getCollection(collectionName);

        /**
         * @type {Record<string, any>}
         */
        const document = await new Promise((resolve, reject) =>
            collection.findOne({ _id: id }, (err, docs) => {
                if (err) reject(err);
                else resolve(docs);
            }),
        );

        return this._normalizeDocument(document);
    }

    /**
     *
     * @param {string} collectionName
     * @param {Record<string, any>} query
     * @returns {Promise<Record<string, any>[]>}
     */
    async findAll(collectionName, query) {
        const collection = this._getCollection(collectionName);
        query = this._normalizeDocument(query);

        /**
         * @type {Record<string, any>[]}
         */
        const documents = await new Promise((resolve, reject) =>
            collection.find(query, (err, docs) => {
                if (err) reject(err);
                else resolve(docs);
            }),
        );

        return documents.map(this._normalizeDocument);
    }

    /**
     * @param {string} collectionName
     * @param {Record<string, any>} query
     * @returns {Promise<number>}
     */
    async removeAll(collectionName, query) {
        const collection = this._getCollection(collectionName);
        query = this._denormalizeDocument(query);
        /**
         * @type {number}
         */
        const removed = await new Promise((resolve, reject) =>
            collection.remove(query, (err, numRemoved) => {
                if (err) reject(err);
                else resolve(numRemoved);
            }),
        );

        return removed;
    }

    /**
     *
     * @param {string} collectionName
     * @param {string} id
     * @returns {Promise<boolean>}
     */
    async removeById(collectionName, id) {
        const collection = this._getCollection(collectionName);

        /**
         * @type {number}
         */
        const removed = await new Promise((resolve, reject) =>
            collection.remove({ _id: id }, (err, numRemoved) => {
                if (err) reject(err);
                else resolve(numRemoved);
            }),
        );

        return removed > 0;
    }
}
