/**
 * Dependencies
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { sortBy } from '../../../redux/actions/products';

/**
 * Component
 */

@connect(state => ({
  sort: state.products.get('sort'),
}), {
  sortBy,
})
class Header extends Component {
  static propTypes = {
    header: PropTypes.object,
    sort: PropTypes.string,
    sortBy: PropTypes.func.isRequired,
  };

  render() {
    const { header, sort, sortBy } = this.props;

    return (
      <div className="cell">
        {(!header.sortable || sort === header.value) ? (
          <span className={sort === header.value ? 'sorted' : ''}>
            {header.name}
          </span>
        ) : (
          <a href="#" onClick={() => sortBy(header.value)}>{header.name}</a>
        )}
      </div>
    );
  }
}

/**
 * Interface
 */

export default Header;
