import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/resource-item';

const cx = classNames.bind(styles);

const ResourceItem = ({ text, id, incrementCount, decrementCount, destroyResource }) => {
  const onIncrement = () => {
    incrementCount(id);
  };
  const onDecrement = () => {
    decrementCount(id);
  };
  const onDestroy = () => {
    destroyResource(id);
  };

  return (
    <li className={cx('resource-item')} key={id}>
      <span className={cx('resource')}>{text}</span>
      <button
        className={cx('button', 'increment')}
        onClick={onIncrement}>+</button>
      <button
        className={cx('button', 'decrement')}
        onClick={onDecrement}>-</button>
      <button
        className={cx('button', 'destroy')}
        onClick={onDestroy}>{String.fromCharCode(215)}</button>
    </li>
  );
};

ResourceItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  destroyResource: PropTypes.func.isRequired
};

export default ResourceItem;
