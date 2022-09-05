import classNames from 'classnames';
import React from 'react';
import left from '../images/left.svg';
import Right from '../images/right.svg';

export const Nav = ({ slicePeopleFromTableForView, setSortedByName, sortedByName }) => {
  return (
    <div className='nav'>
      <div
        className='nav__point '
        onClick={() => slicePeopleFromTableForView('prev')}
      >
        <img src={left} alt="previos" />
        <div className='nav__point'> Previous</div>
      </div>

      <div
        className={classNames('nav--button',
          (sortedByName && 'active-color')
        )}
        onClick={() => setSortedByName(prev => prev === false ? true : false)}
      >
        {(sortedByName) ? 'Sorted' : 'Sort by name'}
      </div>

      <div
        className='nav__point'
        onClick={() => slicePeopleFromTableForView('next')}
      >
        <div>Next</div>
        <img src={Right} alt="next" />
      </div>
    </div>
  );
};
