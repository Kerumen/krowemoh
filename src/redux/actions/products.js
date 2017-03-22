/**
 * Dependencies
 */

import { createAction } from 'redux-actions';

/**
 * Actions
 */

const apiGetProducts = createAction('API:GET_PRODUCTS');
const getProducts = () => dispatch => {
  return dispatch(apiGetProducts({
    endpoint: '/products',
  }));
};

/**
 * Interface
 */

export {
  getProducts,
};
