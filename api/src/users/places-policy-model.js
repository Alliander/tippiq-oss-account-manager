/**
 * PlacesPolicyModel.
 * @module users/places-policy-model
 */


import { PlacesBaseModel } from '../base-model';

const instanceProps = {
  tableName: 'policy',
};

const classProps = {};

export default PlacesBaseModel.extend(instanceProps, classProps);
