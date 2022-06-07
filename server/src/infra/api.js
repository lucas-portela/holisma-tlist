import Express from 'express';
import { AppContext } from '../domain/AppContext';
import { buildControllers } from '../controllers';
import { i18nMiddleware } from './middlewares/i18nMIddleware';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';

/**
 *
 * @param {AppContext} context
 * @param {string} port
 */
export const bootstrapApi = async (context, port) => {
    const app = Express();
    const api = Express.Router();

    app.use(Express.json());
    app.use(i18nMiddleware);

    buildControllers().forEach((controller) => {
        controller.bind(context, api);
        controller.setup();
    });

    api.use(errorHandlerMiddleware);
    app.use('/api', api);

    await new Promise((resolve) => app.listen(port, () => resolve()));

    return app;
};
