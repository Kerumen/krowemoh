/**
 * Dependencies
 */

import { createAction } from 'redux-actions';

/**
 * Actions
 */

const resetProducts = createAction('RESET_PRODUCTS');

const apiGetProducts = createAction('API:GET_PRODUCTS');
const getProducts = () => (dispatch, getState) => {
  const { products } = getState();
  const sort = products.get('sort');

  return dispatch(apiGetProducts({
    endpoint: '/products',
    query: {
      skip: 0,
      limit: 20,
      sort,
    },
  }));
};

const sortByAction = createAction('SORT_BY');
const sortBy = sort => dispatch => {
  dispatch(sortByAction(sort));
  dispatch(resetProducts());
  dispatch(getProducts());
};

/**
 * Interface
 */

export {
  getProducts,
  sortBy,
};
