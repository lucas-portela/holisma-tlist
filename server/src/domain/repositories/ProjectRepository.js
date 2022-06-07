import { AppContext } from '../AppContext';
import { BaseRepository } from './BaseRepository';

export class ProjectRepository extends BaseRepository {
    /**
     *
     * @param {AppContext} context
     */
    constructor(context) {
        super(context, 'projects');
    }
}
