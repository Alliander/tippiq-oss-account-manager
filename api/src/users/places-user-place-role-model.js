/**
 * IdUserModel.
 * @module users/id-user-model
 */


import { PlacesBaseModel } from '../base-model';
import PlacesPlaceModel from './places-place-model';
import PlacesOauth2AccessTokenModel from './places-oauth2-access-token-model';
import PlacesOauth2AuthorizationCodeModel from './places-oauth2-authorization-code-model';

const instanceProps = {
  tableName: 'user_place_role',
  place() {
    return this.belongsTo(PlacesPlaceModel);
  },
  oauth2AccessTokens() {
    return this.hasMany(PlacesOauth2AccessTokenModel, 'user_id');
  },
  oauth2AuthorizationCodes() {
    return this.hasMany(PlacesOauth2AuthorizationCodeModel, 'user_id');
  },
};

const classProps = { dependents: ['oauth2AccessTokens', 'oauth2AuthorizationCodes'] };

export default PlacesBaseModel.extend(instanceProps, classProps);
