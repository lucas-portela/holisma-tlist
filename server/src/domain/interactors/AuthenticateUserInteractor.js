import { AppContext } from '../AppContext';
import { i18nKeys } from '../utils/constants/I18nKeys';
import User from '../entities/User';
import { UserValidator } from '../utils/validators/UserValidator';
import { AuthenticateUserRequest } from './boundaries/AuthenticateUserRequest';
import { AuthenticateUserResult } from './boundaries/AuthenticateUserResult';

export class AuthenticateUserInteractor {
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
     * @param {AuthenticateUserRequest} request
     * @returns {Promise<AuthenticateUserResult>}
     */
    async interact(request) {
        UserValidator.validateEmail(request.email, this._context, request.i18n);
        UserValidator.validatePassword(
            request.password,
            this._context,
            request.i18n,
        );

        /**
         * @type {User}
         */
        // @ts-ignore
        const user = (
            await this._context.userRepository.findAll({
                email: request.email,
            })
        )[0];

        if (!user)
            throw new Error(
                this._context.i18nService.get(
                    request.i18n,
                    i18nKeys.userWithEmailWasNotFound,
                    [request.email],
                ),
            );

        console.log(user);

        const passwordIsCorrect = await this._context.hashingService.compare(
            request.password,
            user.password,
        );

        if (!passwordIsCorrect)
            throw new Error(
                this._context.i18nService.get(
                    request.i18n,
                    i18nKeys.incorrectPassword,
                ),
            );

        const token = await this._context.tokenService.create({
            id: user.id,
            name: user.name,
            email: user.email,
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token,
        };
    }
}
