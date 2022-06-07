import { AppContext } from '../AppContext';
import Project from '../entities/Project';
import Task from '../entities/Task';
import { i18nKeys } from '../utils/constants/I18nKeys';
import { EditTaskRequest } from './boundaries/EditTaskRequest';

export class EditTaskInteractor {
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
     * @param {EditTaskRequest} request
     * @returns {Promise<Project>}
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

        // Validate doneAt
        if (
            request &&
            request.doneAt &&
            request.doneAt &&
            isNaN(request.doneAt?.getMinutes())
        )
            throw new Error(
                this._context.i18nService.get(
                    request.i18n,
                    i18nKeys.invalidDoneAt,
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

        // Edit task
        if (request.description !== undefined)
            task.description = request.description;
        if (request.doneAt !== undefined) task.doneAt = request.doneAt;

        // @ts-ignore
        return await this._context.taskRepository.update(task);
    }
}
