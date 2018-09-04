/**
 * IdOauth2AccessTokenModel.
 * @module models/id-oauth2-access-token-model
 */


import { IdBaseModel } from '../base-model';

const instanceProps = {
  tableName: 'oauth2_access_token',
};

const classProps = {};

export default IdBaseModel.extend(instanceProps, classProps);
