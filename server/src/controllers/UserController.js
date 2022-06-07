import { AuthenticateUserInteractor } from '../domain/interactors/AuthenticateUserInteractor';
import { CreateUserInteractor } from '../domain/interactors/CreateUserInteractor';
import { BaseController } from './BaseController';

export class UserController extends BaseController {
    constructor() {
        super('/user');
    }

    setup() {
        this.post(
            '/',
            async (req, res) => {
                const interactor = new CreateUserInteractor(this.context);

                const result = await interactor.interact({
                    i18n: this.i18n(req),
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                });

                res.send(result);
            },
            false,
        );

        this.post(
            '/auth',
            async (req, res) => {
                const interactor = new AuthenticateUserInteractor(this.context);

                const result = await interactor.interact({
                    i18n: this.i18n(req),
                    email: req.body.email,
                    password: req.body.password,
                });

                res.send(result);
            },
            false,
        );
    }
}
