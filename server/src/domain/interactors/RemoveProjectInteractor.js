import { AppContext } from '../AppContext';
import Project from '../entities/Project';
import { i18nKeys } from '../utils/constants/I18nKeys';
import { RemoveProjectRequest } from './boundaries/RemoveProjectRequest';

export class RemoveProjectInteractor {
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
     * @param {RemoveProjectRequest} request
     * @returns {Promise<void>}
     */
    async interact(request) {
        // Validate userId
        if (!request.userId)
            throw new Error(
                this._context.i18nService.get(
                    request.i18n,
                    i18nKeys.invalidUser,
                ),
            );

        // Validate projectId
        if (!request.projectId)
            throw new Error(
                this._context.i18nService.get(
                    request.i18n,
                    i18nKeys.invalidProject,
                ),
            );

        /**
         * @type {Project}
         */
        // @ts-ignore
        const project = await this._context.projectRepository.findById(
            request.projectId,
        );

        // Validate project
        if (!project)
            throw new Error(
                this._context.i18nService.get(
                    request.i18n,
                    i18nKeys.projectNotFound,
                    [request.projectId],
                ),
            );

        // Validate user access to project
        if (project.userId != request.userId)
            throw new Error(
                this._context.i18nService.get(
                    request.i18n,
                    i18nKeys.accessForbidden,
                ),
            );

        // Delete all the tasks associated with this project
        await this._context.taskRepository.removeAll({
            projectId: request.projectId,
        });

        await this._context.projectRepository.removeById(request.projectId);
    }
}
