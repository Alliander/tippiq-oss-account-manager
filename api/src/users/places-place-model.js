/**
 * PlacesPlaceModel.
 * @module users/places-place-model
 */

import { PlacesBaseModel } from '../base-model';
import UserPlaceRole from './places-user-place-role-model';
import Attribute from './places-attribute-model';
import Policy from './places-policy-model';

const instanceProps = {
  tableName: 'place',
  userPlaceRoles() {
    return this.hasMany(UserPlaceRole);
  },
  placeAttributes() {
    return this.hasMany(Attribute);
  },
  policies() {
    return this.hasMany(Policy);
  },
};

const classProps = { dependents: ['userPlaceRoles', 'placeAttributes', 'policies'] };

export default PlacesBaseModel.extend(instanceProps, classProps);
