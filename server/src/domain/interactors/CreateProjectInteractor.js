import { AppContext } from '../AppContext';
import { i18nKeys } from '../utils/constants/I18nKeys';
import Project from '../entities/Project';
import { CreateProjectRequest } from './boundaries/CreateProjectRequest';

export class CreateProjectInteractor {
    /**
     *
     * @param {AppContext} context
     */
    constructor(context) {
        /**
         * @private
         */
        this._context = context;
    }

    /**
     *
     * @param {CreateProjectRequest} request
     * @returns {Promise<Project>}
     */
    async interact(request) {
        // Validate name
        if (!request.name)
            throw new Error(
                this._context.i18nService.get(
                    request.i18n,
                    i18nKeys.invalidProjectName,
                ),
            );

        // Validate userId
        if (!request.userId)
            throw new Error(
                this._context.i18nService.get(
                    request.i18n,
                    i18nKeys.invalidUser,
                ),
            );

        /**
         * @type {Project}
         */
        // @ts-ignore
        return await this._context.projectRepository.create({
            name: request.name,
            userId: request.userId,
        });
    }
}
