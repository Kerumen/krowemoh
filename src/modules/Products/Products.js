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

@connect(state => ({
  limit: state.products.get('limit'),
}), {
  getProducts,
})
class Products extends Component {
  static propTypes = {
    products: ImmutablePropTypes.list,
    page: PropTypes.number,
    limit: PropTypes.number,
    getProducts: PropTypes.func.isRequired,
  };

  renderAd = index => index % 20 === 0 ? <Ad secondarySeed={index % 40 === 0}/> : null;

  onEnter = () => {
    const { getProducts, page } = this.props;

    getProducts(page + 1);
  };

  render() {
    const { products, page, limit } = this.props;

    return (
      <div className="table">
        <Waypoint onEnter={this.onEnter} />
        {products.map((product, i) => [
          <Product key={product.get('id')} product={product} />,
          this.renderAd((i + 1) + (page * limit)),
        ])}
      </div>
    );
  }
}

/**
 * Interface
 */

export default Products;
