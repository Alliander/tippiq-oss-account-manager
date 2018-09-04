/**
 * IdUserModel.
 * @module users/id-user-model
 */


import { IdBaseModel } from '../base-model';
import IdAttribute from './id-attribute-model';
import IdOauth2AccessToken from './id-oauth2-access-token-model';
import IDUserRole from './id-user-role-model';

const instanceProps = {
  tableName: 'user',
  oauth2AccessTokens() {
    return this.hasMany(IdOauth2AccessToken);
  },
  userAttributes() {
    return this.hasMany(IdAttribute);
  },
  userRoles() {
    return this.hasMany(IDUserRole, 'user');
  },
};

const classProps = { dependents: ['userAttributes', 'oauth2AccessTokens'] };

export default IdBaseModel.extend(instanceProps, classProps);
