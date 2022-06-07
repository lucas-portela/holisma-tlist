import bcrypt from 'bcrypt';
import { HashingService } from '../domain/ports/HashingService';

/**
 * @implements HashingService
 */
export class BcryptHashingService {
    /**
     *
     * @param {string} source
     * @returns {Promise<string>}
     */
    async hash(source) {
        return await new Promise((resolve, reject) =>
            bcrypt.hash(source, 10, (err, encrypted) => {
                if (err) reject(err);
                else resolve(encrypted);
            }),
        );
    }

    /**
     *
     * @param {string} source
     * @param {string} hash
     * @returns {Promise<boolean>}
     */
    async compare(source, hash) {
        return await new Promise((resolve, reject) =>
            bcrypt.compare(source, hash, (err, same) => {
                if (err) reject(err);
                else resolve(same);
            }),
        );
    }
}
