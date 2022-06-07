import { HashingService } from './ports/HashingService';
import { PersistenceService } from './ports/PersistenceService';
import { TokenService } from './ports/TokenService';
import { ProjectRepository } from './repositories/projectRepository';
import { TaskRepository } from './repositories/TaskRepository';
import { UserRepository } from './repositories/UserRepository';
import { I18nService } from './services/I18nService';

export class AppContext {
    /**
     *
     * @param {PersistenceService} persistenceService
     * @param {I18nService} i18nService
     * @param {TokenService} tokenService
     * @param {HashingService} hashingService
     */
    constructor(persistenceService, i18nService, tokenService, hashingService) {
        this.persistenceService = persistenceService;
        this.i18nService = i18nService;
        this.tokenService = tokenService;
        this.hashingService = hashingService;

        /**
         * @type {UserRepository}
         */
        this.userRepository = new UserRepository(this);
        /**
         * @type {ProjectRepository}
         */
        this.projectRepository = new ProjectRepository(this);
        /**
         * @type {TaskRepository}
         */
        this.taskRepository = new TaskRepository(this);
    }
}
