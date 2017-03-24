/**
 * Dependencies
 */

import React, { Component } from 'react';

/**
 * Component
 */

class Ad extends Component {
  render() {
    const { index } = this.props;

    return (
      <div className="row">
        <div className="cell" style={{ width: '100%' }}>
          <img className="ad" src={`/ad/?r=${Math.floor(Math.random() * 1000)}`} />
        </div>
      </div>
    );
  }
}

/**
 * Interface
 */

export default Ad;
