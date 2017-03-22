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

  const { method = 'get', body, query, onSucceeded, onFailed } = action.payload;
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

  const response = await fetch(`/api${endpoint}`, options);

  const isNetworkError = response.status < 200 || response.status >= 300;

  const data = await response.json();
  const isAPIError = data.code < 200 || data.code >= 300;

  const type = isNetworkError || isAPIError ? `${prefix}_FAILED` : `${prefix}_SUCCEEDED`;

  store.dispatch({ type, payload: data.data || data });

  if (onSucceeded && !isAPIError) {
    onSucceeded(data.data || data);
  }

  if (onFailed && isAPIError) {
    onFailed(data.data || data);
  }

  if (isAPIError) {
    window.alert(data.message);
  }

  return data;
};

/**
 * Interface
 */

export default apiMiddleware;
