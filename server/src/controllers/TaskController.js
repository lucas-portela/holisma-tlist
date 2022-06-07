import { CreateProjectInteractor } from '../domain/interactors/CreateProjectInteractor';
import { CreateTaskInteractor } from '../domain/interactors/CreateTaskInteractor';
import { EditTaskInteractor } from '../domain/interactors/EditTaskInteractor';
import { ListProjectsInteractor } from '../domain/interactors/ListProjectsInteractor';
import { ListTasksInteractor } from '../domain/interactors/ListTasksInteractor';
import { RemoveTaskInteractor } from '../domain/interactors/RemoveTaskInteractor';
import { BaseController } from './BaseController';

export class TaskController extends BaseController {
    constructor() {
        super('/task');
    }

    setup() {
        this.get('/', async (req, res) => {
            const interactor = new ListTasksInteractor(this.context);

            const result = await interactor.interact({
                i18n: this.i18n(req),
                userId: this.user(req).id,
                // @ts-ignore
                projectId: req.query.projectId,
            });

            res.send(result);
        });

        this.post('/', async (req, res) => {
            const interactor = new CreateTaskInteractor(this.context);

            const result = await interactor.interact({
                i18n: this.i18n(req),
                userId: this.user(req).id,
                description: req.body.description,
                projectId: req.body.projectId,
            });

            res.send(result);
        });

        this.put('/:taskId', async (req, res) => {
            const interactor = new EditTaskInteractor(this.context);

            const result = await interactor.interact({
                i18n: this.i18n(req),
                userId: this.user(req).id,
                taskId: req.params.taskId,
                description: req.body.description,
                doneAt: req.body.doneAt
                    ? new Date(req.body.doneAt)
                    : req.body.doneAt,
            });

            res.send(result);
        });

        this.delete('/:taskId', async (req, res) => {
            const interactor = new RemoveTaskInteractor(this.context);

            const result = await interactor.interact({
                i18n: this.i18n(req),
                userId: this.user(req).id,
                taskId: req.params.taskId,
            });

            res.send(result);
        });
    }
}
