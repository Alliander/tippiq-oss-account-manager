/**
 * PlacesServiceProviderModel.
 * @module service-provider/places-service-provider-model
 */


import { PlacesBaseModel } from '../base-model';

const instanceProps = {
  tableName: 'service_provider',
};

const classProps = {};

export default PlacesBaseModel.extend(instanceProps, classProps);
