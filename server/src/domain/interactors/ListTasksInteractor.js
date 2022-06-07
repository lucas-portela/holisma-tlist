import { AppContext } from '../AppContext';
import { i18nKeys } from '../utils/constants/I18nKeys';
import Project from '../entities/Project';
import Task from '../entities/Task';
import { ListTasksRequest } from './boundaries/ListTasksRequest';

export class ListTasksInteractor {
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
     * @param {ListTasksRequest} request
     * @returns {Promise<Task[]>}
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

        // @ts-ignore
        return await this._context.taskRepository.findAll({
            projectId: request.projectId,
        });
    }
}
