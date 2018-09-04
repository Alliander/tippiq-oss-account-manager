/**
 * UserRepository.
 * @module users/id-user-repository
 */
import autobind from 'autobind-decorator';
import IdUser from './id-user-model';
import BaseRepository from '../base-repository';
import { id as idBookshelf } from '../bookshelf';


@autobind
/**
 * A Repository for User.
 * @class IdUserRepository
 * @extends BaseRepository
 */
export class IdUserRepository extends BaseRepository {
  /**
   * Construct a IdUserRepository for User.
   * @constructs IdUserRepository
   */
  constructor() {
    super(IdUser);
    this.options = { withRelated: ['oauth2AccessTokens', 'userAttributes'] };
  }

  /**
   * Find a Model by id.
   * @function findById
   * @param {string} id A uuid of a Model.
   * @param {Object} [options] Bookshelf options to pass on to fetch.
   * @returns {Promise<Model>} A Promise that resolves to a Model.
   */
  findById(id, options) {
    return super.findById(id, { ...this.options, ...options });
  }

  /**
   * Find a User by email.
   * @function findByEmail
   * @param {string} email An email address.
   * @param {Object} [options] Bookshelf options to pass on to fetch.
   * @returns {Promise<User>} A Promise that resolves to a User.
   */
  findByEmail(email, options) {
    return super
      .findOne(idBookshelf.knex.raw('LOWER(email) = LOWER(?)', [email]), {
        ...this.options,
        ...options,
      });
  }
}

export default new IdUserRepository();
