/**
 * HoodUserModel.
 * @module users/hood-user-model
 */


import { HoodBaseModel } from '../base-model';
import HoodUserServicePreference from './hood-user-service-preference-model';
import HoodUserPlace from './hood-user-place-model';

const instanceProps = {
  tableName: 'user',
  userServicePreferences() {
    return this.hasMany(HoodUserServicePreference, 'user');
  },
  userPlaces() {
    return this.hasMany(HoodUserPlace, 'user_id');
  },
};

const classProps = { dependents: ['userServicePreferences', 'userPlaces'] };

export default HoodBaseModel.extend(instanceProps, classProps);
