/**
 * Dependencies
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { sortBy } from '../../../redux/actions/products';

/**
 * Component
 */

const Header = ({ header, sort, sortBy }) => (
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

/**
 * PropTypes
 */

Header.propTypes = {
  header: PropTypes.object,
  sort: PropTypes.string,
  sortBy: PropTypes.func.isRequired,
};

/**
 * Interface
 */

export default connect(state => ({
  sort: state.products.get('sort'),
}), {
  sortBy,
})(Header);
