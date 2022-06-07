import { BaseEntity } from '../entities/BaseEntity';
import { AbstractMethodCalledError } from '../errors/AbstractMethodCalledError';

/**
 * @interface
 */
export class HashingService {
    /**
     *
     * @param {string} source
     * @returns {Promise<string>}
     */
    async hash(source) {
        throw new AbstractMethodCalledError();
    }

    /**
     *
     * @param {string} source
     * @param {string} hash
     * @returns {Promise<boolean>}
     */
    async compare(source, hash) {
        throw new AbstractMethodCalledError();
    }
}
