/**
 * Dependencies
 */

import { createAction } from 'redux-actions';

/**
 * Actions
 */

const apiGetProducts = createAction('API:GET_PRODUCTS');
const getProducts = page => (dispatch, getState) => {
  const { products } = getState();

  const fetching = products.get('fetching');
  const noMoreProducts = products.get('noMoreProducts');
  const nextPage = products.get('nextPage');

  if (fetching || noMoreProducts) return;

  if (page !== nextPage) return;

  const sort = products.get('sort');
  const limit = 50;
  return dispatch(apiGetProducts({
    endpoint: '/products',
    query: {
      skip: nextPage * limit,
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

const showNextPageAction = createAction('SHOW_NEXT_PAGE');
const showNextPage = sort => (dispatch, getState) => {
  const { products } = getState();

  if (products.get('nextPage') === 0 || products.get('noMoreProducts')) return;
  dispatch(showNextPageAction());
};

/**
 * Interface
 */

export {
  getProducts,
  sortBy,
  showNextPage,
};
