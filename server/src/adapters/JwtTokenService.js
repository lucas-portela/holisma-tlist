import jwt from 'jsonwebtoken';
import { InvalidToken } from '../domain/errors/InvalidToken';
import { TokenService } from '../domain/ports/TokenService';

/**
 * @implements TokenService
 */
export class JwtTokenService {
    constructor() {
        this._secret = process.env.JWT_SECRET;
    }

    /**
     *
     * @param {Record<string, any>} payload
     * @returns {Promise<string>}
     */
    async create(payload) {
        return jwt.sign(payload, this._secret, {
            algorithm: 'HS256',
        });
    }

    /**
     *
     * @param {string} token
     * @returns {Promise<Record<string, any>>}
     */
    validate(token) {
        try {
            //@ts-ignore
            return jwt.verify(token, this._secret);
        } catch (err) {
            throw new InvalidToken();
        }
    }
}
