/**
 * Dependencies
 */

import { createAction } from 'redux-actions';

/**
 * Actions
 */

const apiGetProducts = createAction('API:GET_PRODUCTS');
const getProducts = () => (dispatch, getState) => {
  const { products } = getState();

  const fetching = products.get('fetching');
  const noMoreProducts = products.get('noMoreProducts');
  if (fetching || noMoreProducts) return;

  const sort = products.get('sort');
  const page = products.get('nextPage');
  const limit = 50;
  return dispatch(apiGetProducts({
    endpoint: '/products',
    query: {
      skip: page * limit,
      limit,
      sort,
    },
  }));
};

const sortByAction = createAction('SORT_BY');
const sortBy = sort => dispatch => {
  dispatch(sortByAction(sort));
  dispatch(getProducts());
};

/**
 * Interface
 */

export {
  getProducts,
  sortBy,
};
