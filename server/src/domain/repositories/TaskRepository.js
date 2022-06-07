import { AppContext } from '../AppContext';
import { BaseRepository } from './BaseRepository';

export class TaskRepository extends BaseRepository {
    /**
     *
     * @param {AppContext} context
     */
    constructor(context) {
        super(context, 'tasks');
    }
}
