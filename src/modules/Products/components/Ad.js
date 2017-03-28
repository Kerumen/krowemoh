/**
 * Dependencies
 */

import React, { PropTypes } from 'react';

/**
 * Component
 */

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const Ad = ({ secondarySeed }) => {
  const seed = secondarySeed ? [0, 7] : [8, 16];
  return (
    <div className="row">
      <div className="cell" style={{ width: '100%' }}>
        <img className="ad" src={`/ad/?r=${randomInt(...seed)}`}/>
      </div>
    </div>
  );
};

/**
 * PropTypes
 */

Ad.propTypes = {
  secondarySeed: PropTypes.bool,
};

/**
 * Interface
 */

export default Ad;
