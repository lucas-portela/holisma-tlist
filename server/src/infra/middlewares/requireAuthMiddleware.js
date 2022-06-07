import Express from 'express';
import { AppContext } from '../../domain/AppContext';

/**
 *
 * @param {AppContext} context
 * @returns
 */
export const requireAuthMiddleware = (context) => {
    /**
     *
     * @param {Express.Request} req
     * @param {Express.Response} res
     * @param {Express.NextFunction} next
     */
    return (req, res, next) => {
        const token = (req.headers.authorization ?? '')
            .replace('Bearer', '')
            .trim();
        try {
            if (!token) throw new Error('Not authorized!');
            //@ts-ignore
            req.user = context.tokenService.validate(token);
            next();
        } catch (err) {
            res.status(401);
            res.send({ error: err.message });
            console.log(err);
        }
    };
};
