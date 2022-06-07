import Express from 'express';

/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 */
export const i18nMiddleware = (req, res, next) => {
    req.query.i18n = req.query.i18n || 'en_us';
    next();
};
