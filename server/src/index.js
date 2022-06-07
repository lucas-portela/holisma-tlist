import { buildDevelopmentAppContext } from './contexts/development';
import { bootstrapApi } from './infra/api';

require('dotenv').config();

(async () => {
    const port = process.env.API_HTTP_PORT;
    const context = await buildDevelopmentAppContext();
    const api = await bootstrapApi(context, port);
    console.log('Holisma TList listening on port ' + port);
})();
