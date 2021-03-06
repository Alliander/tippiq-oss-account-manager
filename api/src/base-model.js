/**
 * Bookshelf BaseModel.
 * @module common/base-model
 */

import { reduce } from 'lodash/collection';
import { camelCase, snakeCase } from 'lodash/string';

import { id, places, hood } from './bookshelf';

const instanceProps = {
  parse(attrs) {
    return reduce(attrs, (memo, val, key) => {
      memo[camelCase(key)] = val; // eslint-disable-line no-param-reassign
      return memo;
    }, {});
  },
  format(attrs) {
    return reduce(attrs, (memo, val, key) => {
      memo[snakeCase(key)] = val; // eslint-disable-line no-param-reassign
      return memo;
    }, {});
  },
  // via http://stackoverflow.com/a/29157174/363448
  orderBy(column, order) {
    return this.query((qb) => {
      qb.orderBy(column, order);
    });
  },
  updateWith(data) {
    this.keys().forEach((key) => {
      if (key !== this.idAttribute && typeof data[key] !== 'undefined') {
        this.set(key, data[key]);
      }
    });
  },
};

const classProps = {};

export const IdBaseModel = id.Model.extend(instanceProps, classProps);
export const PlacesBaseModel = places.Model.extend(instanceProps, classProps);
export const HoodBaseModel = hood.Model.extend(instanceProps, classProps);

