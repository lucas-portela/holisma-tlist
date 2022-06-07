import { AppContext } from '../domain/AppContext';
import Express from 'express';
import { requireAuthMiddleware } from '../infra/middlewares/requireAuthMiddleware';
import User from '../domain/entities/User';

// @ts-nocheck
export class BaseController {
    /**
     *
     * @param {string} baseRoute
     */
    constructor(baseRoute) {
        this._baseRoute = baseRoute;
    }

    setup() {
        // Routes will be configured here in inherited classes
    }

    /**
     *
     * @param {AppContext} context
     * @param {Express.Router} router
     */
    bind(context, router) {
        /**
         * @type {AppContext}
         */
        this.context = context;

        /**
         * @type {Express.Router}
         */
        this.router = router;
    }

    /**
     * @param {string} method
     * @param {string} route
     * @param {Express.Handler} handler
     * @param {boolean} [requiresAuthentication]
     */
    _setupRoute(method, route, handler, requiresAuthentication = true) {
        route = (this._baseRoute + route).replace(/\/\//g, '/');
        if (requiresAuthentication)
            this.router[method](route, requireAuthMiddleware(this.context));
        this.router[method](route, async (req, res, next) => {
            try {
                await handler(req, res, next);
                next();
            } catch (err) {
                next(err);
            }
        });
    }

    /**
     *
     * @param {Express.Request} req
     * @returns {string}
     */
    i18n(req) {
        //@ts-ignore
        return req.query.i18n;
    }

    /**
     *
     * @param {Express.Request} req
     * @returns {User}
     */
    user(req) {
        //@ts-ignore
        return req.user;
    }

    /**
     * @param {string} route
     * @param {Express.Handler} handler
     * @param {boolean} [requiresAuthentication]
     */
    get(route, handler, requiresAuthentication = true) {
        this._setupRoute('get', route, handler, requiresAuthentication);
    }

    /**
     * @param {string} route
     * @param {Express.Handler} handler
     * @param {boolean} [requiresAuthentication]
     */
    post(route, handler, requiresAuthentication = true) {
        this._setupRoute('post', route, handler, requiresAuthentication);
    }

    /**
     * @param {string} route
     * @param {Express.Handler} handler
     * @param {boolean} [requiresAuthentication]
     */
    put(route, handler, requiresAuthentication = true) {
        this._setupRoute('put', route, handler, requiresAuthentication);
    }

    /**
     * @param {string} route
     * @param {Express.Handler} handler
     * @param {boolean} [requiresAuthentication]
     */
    delete(route, handler, requiresAuthentication = true) {
        this._setupRoute('delete', route, handler, requiresAuthentication);
    }
}
