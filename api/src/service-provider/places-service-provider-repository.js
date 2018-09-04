/**
 * PlacesServiceProviderRepository.
 * @module service-provider/places-service-provider-repository
 */
import autobind from 'autobind-decorator';
import PlacesServiceProvider from './places-service-provider-model';
import BaseRepository from '../base-repository';


@autobind
/**
 * A Repository for User.
 * @class IdUserRepository
 * @extends BaseRepository
 */
export class PlacesServiceProviderRepository extends BaseRepository {
  /**
   * Construct a PlacesServiceProviderRepository for ServiceProvider.
   * @constructs PlacesServiceProviderRepository
   */
  constructor() {
    super(PlacesServiceProvider);
  }
}

export default new PlacesServiceProviderRepository();
