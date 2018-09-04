/**
 * PlacesPlaceRepository.
 * @module users/places-place-repository
 */
import autobind from 'autobind-decorator';
import Place from './places-place-model';
import BaseRepository from '../base-repository';

@autobind
/**
 * A Repository for Place.
 * @class PlacesPlaceRepository
 * @extends BaseRepository
 */
export class PlacesPlaceRepository extends BaseRepository {
  /**
   * Construct a PlacesPlaceRepository for Place.
   * @constructs PlacesPlaceRepository
   */
  constructor() {
    super(Place);
  }

  deleteByTippiqId(tippiqId, options) {
    this
      .logger
      .debug({ _method: 'deleteByTippiqId', tippiqId });
    return this.deleteWhere(PlacesPlaceRepository.queryBuilderFor(tippiqId), options);
  }

  static queryBuilderFor(tippiqId) {
    return function whereIdInUserPlaceRole(qb) {
      qb
        .whereIn('id', function selectUserPlaceRole() {
          return this
            .from('user_place_role')
            .select('place_id')
            .where('tippiq_id', tippiqId);
        });
    };
  }
  /**
   * Find all Places by tippiq id.
   * @function findAllByTippiqId
   * @param {string} tippiqId A tippiq id.
   * @param {Object} [options] Bookshelf options to pass on to fetch.
   * @returns {Promise<Collection<Place>>} A Promise that resolves to a Collection of Place.
   */
  findAllByTippiqId(tippiqId, options) {
    this
      .logger
      .debug({ _method: 'findAllByTippiqId', tippiqId });
    return this
      .Model
      .query(PlacesPlaceRepository.queryBuilderFor(tippiqId))
      .fetchAll({
        ...options,
        require: false,
        withRelated: ['policies', 'placeAttributes', 'userPlaceRoles.oauth2AccessTokens', 'userPlaceRoles.oauth2AuthorizationCodes'],
      });
  }
}

export default new PlacesPlaceRepository();
