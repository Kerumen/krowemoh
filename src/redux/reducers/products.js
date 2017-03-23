/**
 * Dependencies
 */

import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

/**
 * Initial state
 */

const initialState = fromJS({
  sort: 'id',
  products: [],
});

/**
 * Reducer
 */

const reducer = handleActions({

  GET_PRODUCTS_SUCCEEDED: (state, { payload: batch }) =>
    state.update('products', arr => arr.concat(fromJS(batch.results))),

  SORT_BY: (state, { payload: sort }) => state.set('sort', sort),

  RESET_PRODUCTS: state => state.set('products', initialState.get('products')),

}, initialState);

/**
 * Interface
 */

export default reducer;
