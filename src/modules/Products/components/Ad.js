/**
 * Dependencies
 */

import React, { Component } from 'react';

/**
 * Component
 */

class Ad extends Component {
  render() {
    return (
      <tr>
        <td colSpan={4}>
          <img className="ad" src={`/ad/?r=${Math.floor(Math.random() * 1000)}`} />
        </td>
      </tr>
    );
  }
}

/**
 * Interface
 */

export default Ad;
