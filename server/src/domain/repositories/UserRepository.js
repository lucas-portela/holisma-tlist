import { AppContext } from '../AppContext';
import { BaseRepository } from './BaseRepository';

export class UserRepository extends BaseRepository {
    /**
     *
     * @param {AppContext} context
     */
    constructor(context) {
        super(context, 'users');
    }
}
