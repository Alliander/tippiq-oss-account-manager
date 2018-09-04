/**
 * HoodUserRepository.
 * @module users/hood-user-repository
 */
import autobind from 'autobind-decorator';
import User from './hood-user-model';
import BaseRepository from '../base-repository';

@autobind
/**
 * A Repository for User.
 * @class HoodUserRepository
 * @extends BaseRepository
 */
export class HoodUserRepository extends BaseRepository {
  /**
   * Construct a HoodUserRepository.
   * @constructs HoodUserRepository
   */
  constructor() {
    super(User, { withRelated: 'userPlaces' });
  }
}

export default new HoodUserRepository();
