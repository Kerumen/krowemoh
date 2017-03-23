/**
 * Dependencies
 */

import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

/**
 * Initial state
 */

const initialState = fromJS({
  fetching: false,
  sort: 'id',
  nextPage: 0,
  noMoreProducts: false,
  products: [],
});

/**
 * Reducer
 */

const reducer = handleActions({

  GET_PRODUCTS: state => state.set('fetching', true),

  GET_PRODUCTS_SUCCEEDED: (state, { payload: { query, results } }) =>
    state
      .set('fetching', false)
      .set('nextPage', (query.skip / query.limit) + 1)
      .set('noMoreProducts', results.length < query.limit)
      .update('products', arr => arr.concat(fromJS(results))),

  SORT_BY: (state, { payload: sort }) => initialState.set('sort', sort),

}, initialState);

/**
 * Interface
 */

export default reducer;
