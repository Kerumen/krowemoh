/**
 * Dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { getProducts } from '../redux/actions/products';

import Product from './Products/components/Product';
import Header from './Products/components/Header';
import Ad from "./Products/components/Ad";

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
  static propTypes = {
    products: ImmutablePropTypes.list,
    noMoreProducts: PropTypes.bool,
    getProducts: PropTypes.func.isRequired,
  };

  renderAd = index => {
    if (index > 0 && index % 20 === 0) {
      return <Ad />;
    }
    return null;
  };

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
            ) : products.map((product, i) => [
              <Product index={i} key={product.get('id')} product={product} />,
              this.renderAd(i)
            ])}
          </tbody>
        </table>
        <Waypoint onEnter={() => getProducts()} />
        {noMoreProducts && (<div>~ end of catalogue ~</div>)}
      </div>
    );
  }
}

/**
 * Interface
 */

export default App;
