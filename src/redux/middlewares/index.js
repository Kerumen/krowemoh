/**
 * Dependencies
 */

import thunk from 'redux-thunk';

/**
 * Middlewares
 */

import api from './api';
import logger from './logger';

/**
 * Interface
 */

export default [
  thunk,
  api,
  logger,
];
