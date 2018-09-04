/**
 * IdAttributeModel.
 * @module users/id-attribute-model
 */


import { IdBaseModel } from '../base-model';

const instanceProps = {
  tableName: 'attribute',
};

const classProps = {};

export default IdBaseModel.extend(instanceProps, classProps);
