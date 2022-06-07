import { AppContext } from '../AppContext';
import Project from '../entities/Project';
import { i18nKeys } from '../utils/constants/I18nKeys';
import { EditProjectRequest } from './boundaries/EditProjectRequest';

export class EditProjectInteractor {
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
     * @param {EditProjectRequest} request
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

        // Edit project
        project.name = request.name;

        // @ts-ignore
        return await this._context.projectRepository.update(project);
    }
}
