/**
 * Bookshelf configuration.
 * @module bookshelf
 */

import bookshelf from 'bookshelf';
import knex from 'knex';
import bookshelfCascadeDelete from 'bookshelf-cascade-delete';
import debugLogger from 'debugnyan';
import { capitalize } from 'lodash';

function configureKnex(name, connection) {
  const logger = debugLogger(`tippiq:Knex${capitalize(name)}`);
  const knexInstance = knex({
    client: 'pg',
    connection,
  });
  knexInstance.on('query', query => logger.debug(query));

  knexInstance.logger = logger;

  return knexInstance;
}

function configureBookshelf(name, connection) {
  const bookshelfInstance = bookshelf(configureKnex(name, connection));

  bookshelfInstance.plugin(bookshelfCascadeDelete);

  return bookshelfInstance;
}

export const id = configureBookshelf('id', process.env.TIPPIQ_ID_DATABASE_URL);
export const places = configureBookshelf('places', process.env.TIPPIQ_PLACES_DATABASE_URL);
export const hood = configureBookshelf('hood', process.env.TIPPIQ_HOOD_DATABASE_URL);
