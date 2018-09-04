/**
 * PlacesOauth2AccessTokenModel.
 * @module models/places-oauth2-access-token-model
 */


import { PlacesBaseModel } from '../base-model';

const instanceProps = {
  tableName: 'oauth2_access_token',
};

const classProps = {};

export default PlacesBaseModel.extend(instanceProps, classProps);
