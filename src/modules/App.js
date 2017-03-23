/**
 * Dependencies
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

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
}), {
  getProducts,
})
class App extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products } = this.props;

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
      </div>
    );
  }
}

/**
 * Interface
 */

export default App;
