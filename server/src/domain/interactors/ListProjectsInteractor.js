import { AppContext } from '../AppContext';
import { i18nKeys } from '../utils/constants/I18nKeys';
import Project from '../entities/Project';
import { ListProjectsRequest } from './boundaries/ListProjectsRequest';

export class ListProjectsInteractor {
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
     * @param {ListProjectsRequest} request
     * @returns {Promise<Project[]>}
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

        /**
         * @type {Project[]}
         */
        //@ts-ignore
        const projects = await this._context.projectRepository.findAll({
            userId: request.userId,
        });

        // Eager load project tasks
        for (let project of projects) {
            //@ts-ignore
            project.tasks = await this._context.taskRepository.findAll({
                projectId: project.id,
            });
        }

        return projects;
    }
}
