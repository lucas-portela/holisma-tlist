import { BaseController } from './BaseController';
import { ProjectController } from './ProjectController';
import { TaskController } from './TaskController';
import { UserController } from './UserController';

/**
 *
 * @returns {BaseController[]}
 */
export const buildControllers = () => {
    return [
        new UserController(),
        new ProjectController(),
        new TaskController(),
    ];
};
