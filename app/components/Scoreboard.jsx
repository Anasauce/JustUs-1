import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/scoreboard';

const cx = classNames.bind(styles);

const Scoreboard = ({resources}) => {
  const resourceListItems = resources.map((resource, key) => {
    return (
    <li className={cx('item')} key={key}>
      <span className={cx('resource')}>{resource.text}</span>
      <span className={cx('count')}>{resource.count}</span>
    </li>);
  });
  return (
    <div className={cx('scoreboard')}>
      <h3 className={cx('header')}>Splash count</h3>
      <ul className={cx('list')}>
        {resourceListItems}
      </ul>
    </div>
  );
};

Scoreboard.propTypes = {
  resources: PropTypes.array.isRequired
};

export default Scoreboard;
