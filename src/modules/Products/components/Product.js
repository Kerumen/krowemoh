/**
 * Dependencies
 */

import React, { Component } from 'react';
import moment from 'moment';

/**
 * Component
 */

class Product extends Component {
  render() {
    const { product } = this.props;
    const date = moment(new Date(product.get('date')));
    const dateDisplay = date.isBefore(moment().subtract(1, 'week'))
      ? date.format('LLL')
      : date.fromNow();

    return (
      <tr key={product.get('id')}>
        <td style={{ fontSize: product.get('size') }}>{product.get('face')}</td>
        <td>{product.get('size')}</td>
        <td>{`$${product.get('price').toFixed(2)}`}</td>
        <td>{dateDisplay}</td>
      </tr>
    );
  }
}

/**
 * Interface
 */

export default Product;
