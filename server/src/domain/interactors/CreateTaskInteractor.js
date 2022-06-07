import { AppContext } from '../AppContext';
import { i18nKeys } from '../utils/constants/I18nKeys';
import Project from '../entities/Project';
import Task from '../entities/Task';
import { CreateTaskRequest } from './boundaries/CreateTaskRequest';

export class CreateTaskInteractor {
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
     * @param {CreateTaskRequest} request
     * @returns {Promise<Task>}
     */
    async interact(request) {
        // Validate description
        if (!request.description)
            throw new Error(
                this._context.i18nService.get(
                    request.i18n,
                    i18nKeys.invalidTaskDescription,
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

        /**
         * @type {Task}
         */
        // @ts-ignore
        return await this._context.taskRepository.create({
            projectId: request.projectId,
            description: request.description,
        });
    }
}
