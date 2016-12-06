import React, { PropTypes } from 'react';
import ResourceItem from 'components/ResourceItem';
import classNames from 'classnames/bind';
import styles from 'css/components/main-section';

const cx = classNames.bind(styles);

const MainSection = ({ resources, onIncrement, onDecrement, onDestroy }) => {
  const resourceItems = resources.map((resource, key) => {
    return (
      <ResourceItem
        index={key}
        id={resource.id}
        key={key}
        text={resource.text}
        incrementCount={onIncrement}
        decrementCount={onDecrement}
        destroyResource={onDestroy} />);
  });

  return (
    <div className={cx('main-section')}>
      <h3 className={cx('header')}>Splash for your favorite hack day idea</h3>
      <ul className={cx('list')}>{resourceItems}</ul>
    </div>
  );
};

MainSection.propTypes = {
  resources: PropTypes.array.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired
};

export default MainSection;
