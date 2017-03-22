/**
 * Dependencies
 */

import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

/**
 * Initial state
 */

const initialState = fromJS([]);

/**
 * Reducer
 */

const reducer = handleActions({

  GET_PRODUCTS_SUCCEEDED: (state, { payload: products }) => state.set('names', fromJS(products)),

}, initialState);

/**
 * Interface
 */

export default reducer;
