/**
 * PlacesOauth2AuthorizationCodeModel.
 * @module models/places-oauth2-authorization-code-model
 */


import { PlacesBaseModel } from '../base-model';

const instanceProps = {
  tableName: 'oauth2_authorization_code',
};

const classProps = {};

export default PlacesBaseModel.extend(instanceProps, classProps);
