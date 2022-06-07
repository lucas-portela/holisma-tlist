import { AppContext } from '../AppContext';
import { i18nKeys } from '../utils/constants/I18nKeys';
import Project from '../entities/Project';
import { RemoveTaskRequest } from './boundaries/RemoveTaskRequest';
import Task from '../entities/Task';

export class RemoveTaskInteractor {
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
     * @param {RemoveTaskRequest} request
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

        // Validate taskId
        if (!request.taskId)
            throw new Error(
                this._context.i18nService.get(
                    request.i18n,
                    i18nKeys.invalidTask,
                ),
            );

        /**
         * @type {Task}
         */
        // @ts-ignore
        const task = await this._context.taskRepository.findById(
            request.taskId,
        );

        // Validate task
        if (!task)
            throw new Error(
                this._context.i18nService.get(
                    request.i18n,
                    i18nKeys.taskNotFound,
                    [request.taskId],
                ),
            );

        /**
         * @type {Project}
         */
        // @ts-ignore
        const project = await this._context.projectRepository.findById(
            task.projectId,
        );

        // Validate project
        if (!project)
            throw new Error(
                this._context.i18nService.get(
                    request.i18n,
                    i18nKeys.projectNotFound,
                    [task.projectId],
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

        await this._context.taskRepository.removeById(request.taskId);
    }
}
