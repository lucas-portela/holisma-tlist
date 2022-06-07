import Express from 'express';

/**
 *
 * @param {Error} err
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 */
export const errorHandlerMiddleware = (err, req, res, next) => {
    res.status(400);
    res.send({
        error: err.message,
    });
    console.log(err.stack);
};
