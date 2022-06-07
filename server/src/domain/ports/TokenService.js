import { AbstractMethodCalledError } from '../errors/AbstractMethodCalledError';

/**
 * @interface
 */
export class TokenService {
    /**
     *
     * @param {Record<string, any>} payload
     * @returns {Promise<string>}
     */
    async create(payload) {
        throw new AbstractMethodCalledError();
    }

    /**
     *
     * @param {string} token
     * @returns {Promise<Record<string, any>>}
     */
    validate(token) {
        throw new AbstractMethodCalledError();
    }
}
