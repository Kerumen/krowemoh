/**
 * Dependencies
 */

import queryString from 'query-string';

/**
 * Middleware
 */

const apiMiddleware = store => next => async action => {
  if (!action.type.startsWith('API:')) return next(action);

  const prefix = action.type.split(':')[1];

  const { method = 'get', body, query } = action.payload;
  let { endpoint } = action.payload;

  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (query) {
    const params = queryString.stringify(query);
    endpoint = `${endpoint}?${params}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  store.dispatch({ type: prefix });

  try {
    const response = await fetch(`/api${endpoint}`, options);
    const data = await response.text();
    const json = JSON.parse(`[${data.trim().split('\n').join(',')}]`);

    store.dispatch({ type: `${prefix}_SUCCEEDED`, payload: { results: json, query } });

    return data;
  } catch (error) {
    store.dispatch({ type: `${prefix}_FAILED`, error });
    return error;
  }
};

/**
 * Interface
 */

export default apiMiddleware;
