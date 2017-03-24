/**
 * Dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { getProducts, showNextPage } from '../redux/actions/products';

import Header from './Products/components/Header';
import Products from './Products/Products';

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
  pages: state.products.get('pages'),
  noMoreProducts: state.products.get('noMoreProducts'),
  indexVisible: state.products.get('indexVisible'),
}), {
  getProducts,
  showNextPage,
})
class App extends Component {
  static propTypes = {
    pages: ImmutablePropTypes.list,
    noMoreProducts: PropTypes.bool,
    indexVisible: PropTypes.number,
    getProducts: PropTypes.func.isRequired,
    showNextPage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getProducts(0);
  }

  render() {
    const { pages, indexVisible, noMoreProducts, showNextPage } = this.props;

    return (
      <div>
        <div className="table">
          <div className="row">
            {headers.map(header => <Header key={header.value} header={header} />)}
          </div>
          {pages.size === 0 ? (
            <div className="loading">Loading...</div>
          ) : pages.map((page, i) => indexVisible >= i && <Products key={i} page={i} products={page} />)}
        </div>
        <Waypoint onEnter={() => showNextPage()} />
        {noMoreProducts && (<div style={{ textAlign: 'center' }}>~ end of catalogue ~</div>)}
      </div>
    );
  }
}

/**
 * Interface
 */

export default App;
