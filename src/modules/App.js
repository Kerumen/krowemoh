/**
 * Dependencies
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';

import { getProducts } from '../redux/actions/products';

import Product from './Products/components/Product';
import Header from './Products/components/Header';

/**
 * Component
 */

const headers = [{
  name: 'Face',
  value: 'id',
  sortable: true,
}, {
  name: 'Size',
  value: 'size',
  sortable: true,
}, {
  name: 'Price',
  value: 'price',
  sortable: true,
}, {
  name: 'Date',
  value: 'date',
  sortable: false,
}];

@connect(state => ({
  products: state.products.get('products'),
  noMoreProducts: state.products.get('noMoreProducts'),
}), {
  getProducts,
})
class App extends Component {
  render() {
    const { products, getProducts, noMoreProducts } = this.props;

    return (
      <div>
        <table className="table">
          <thead>
          <tr>
            {headers.map(header => <Header key={header.value} header={header} />)}
          </tr>
          </thead>
          <tbody>
            {products.size === 0 ? (
              <tr>
                <td colSpan={4} className="loading">Loading...</td>
              </tr>
            ) : products.map(product => <Product key={product.get('id')} product={product} />)}
          </tbody>
        </table>
        <Waypoint onEnter={() => getProducts()} />
        {noMoreProducts && (
          <div>~ end of catalogue ~</div>
        )}
      </div>
    );
  }
}

/**
 * Interface
 */

export default App;
