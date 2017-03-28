/**
 * Dependencies
 */

import React from 'react';
import moment from 'moment';
import ImmutablePropTypes from 'react-immutable-proptypes';

/**
 * Component
 */

const Product = ({ product }) => {
  const date = moment(new Date(product.get('date')));
  const dateDisplay = date.isBefore(moment().subtract(1, 'week'))
    ? date.format('LLL')
    : date.fromNow();

  return (
    <div className="row">
      <div className="cell" style={{ fontSize: product.get('size') }}>
        {product.get('face')}
      </div>
      <div className="cell">{product.get('size')}</div>
      <div className="cell">{`$${product.get('price').toFixed(2)}`}</div>
      <div className="cell">{dateDisplay}</div>
    </div>
  );
};

/**
 * PropTypes
 */

Product.propTypes = {
  product: ImmutablePropTypes.map,
};

/**
 * Interface
 */

export default Product;
