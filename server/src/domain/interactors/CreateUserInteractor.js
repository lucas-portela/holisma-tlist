import { AppContext } from '../AppContext';
import { i18nKeys } from '../utils/constants/I18nKeys';
import User from '../entities/User';
import { UserValidator } from '../utils/validators/UserValidator';
import { CreateUserRequest } from './boundaries/CreateUserRequest';
import { CreateUserResult } from './boundaries/CreateUserResult';

export class CreateUserInteractor {
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
     * @param {CreateUserRequest} request
     * @returns {Promise<CreateUserResult>}
     */
    async interact(request) {
        UserValidator.validateEmail(request.email, this._context, request.i18n);
        UserValidator.validatePassword(
            request.password,
            this._context,
            request.i18n,
        );

        // Validate name
        if (!request.name)
            throw new Error(
                this._context.i18nService.get(
                    request.i18n,
                    i18nKeys.invalidUserName,
                ),
            );

        // Validate password length to be at least 6
        if ((request.password ?? '').length < 6)
            throw new Error(
                this._context.i18nService.get(
                    request.i18n,
                    i18nKeys.invalidPassword,
                ),
            );

        // Validate e-mail uniqueness
        const conflictingUsers = await this._context.userRepository.findAll({
            email: request.email,
        });

        if (conflictingUsers.length > 0)
            throw new Error(
                this._context.i18nService.get(
                    request.i18n,
                    i18nKeys.theEmailIsBeingUsedByAnotherUser,
                    [request.email],
                ),
            );

        const password = await this._context.hashingService.hash(
            request.password,
        );

        /**
         * @type {User}
         */
        // @ts-ignore
        const user = await this._context.userRepository.create({
            name: request.name,
            email: request.email,
            password,
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
}
