/**
 * Dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { getProducts } from '../../redux/actions/products';

import Product from './components/Product';
import Ad from './components/Ad';

/**
 * Component
 */

@connect(null, {
  getProducts,
})
class Products extends Component {
  static propTypes = {
    products: ImmutablePropTypes.list,
    page: PropTypes.number,
    getProducts: PropTypes.func.isRequired,
  };

  renderAd = index => {
    if (index > 0 && index % 20 === 0) {
      return <Ad />;
    }
    return null;
  };

  onEnter = () => {
    const { getProducts, page } = this.props;

    getProducts(page + 1);
  };

  render() {
    const { products } = this.props;

    return (
      <div className="table">
        <Waypoint onEnter={this.onEnter} />
        {products.map((product, i) => [
          <Product index={i} key={product.get('id')} product={product} />,
          this.renderAd(i),
        ])}
      </div>
    );
  }
}

/**
 * Interface
 */

export default Products;
