import { AuthenticateUserInteractor } from '../domain/interactors/AuthenticateUserInteractor';
import { CreateProjectInteractor } from '../domain/interactors/CreateProjectInteractor';
import { CreateUserInteractor } from '../domain/interactors/CreateUserInteractor';
import { EditProjectInteractor } from '../domain/interactors/EditProjectInteractor';
import { ListProjectsInteractor } from '../domain/interactors/ListProjectsInteractor';
import { RemoveProjectInteractor } from '../domain/interactors/RemoveProjectInteractor';
import { BaseController } from './BaseController';

export class ProjectController extends BaseController {
    constructor() {
        super('/project');
    }

    setup() {
        this.get('/', async (req, res) => {
            const interactor = new ListProjectsInteractor(this.context);

            const result = await interactor.interact({
                i18n: this.i18n(req),
                userId: this.user(req).id,
            });

            res.send(result);
        });

        this.post('/', async (req, res) => {
            const interactor = new CreateProjectInteractor(this.context);

            const result = await interactor.interact({
                i18n: this.i18n(req),
                userId: this.user(req).id,
                name: req.body.name,
            });

            res.send(result);
        });

        this.put('/:projectId', async (req, res) => {
            const interactor = new EditProjectInteractor(this.context);

            const result = await interactor.interact({
                i18n: this.i18n(req),
                userId: this.user(req).id,
                projectId: req.params.projectId,
                name: req.body.name,
            });

            res.send(result);
        });

        this.delete('/:projectId', async (req, res) => {
            const interactor = new RemoveProjectInteractor(this.context);

            const result = await interactor.interact({
                i18n: this.i18n(req),
                userId: this.user(req).id,
                projectId: req.params.projectId,
            });

            res.send(result);
        });
    }
}
