/**
 * PlacesAttributeModel.
 * @module users/places-attribute-model
 */


import { PlacesBaseModel } from '../base-model';

const instanceProps = {
  tableName: 'attribute',
};

const classProps = {};

export default PlacesBaseModel.extend(instanceProps, classProps);
