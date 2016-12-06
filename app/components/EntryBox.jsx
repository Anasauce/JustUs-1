import React, { PropTypes } from 'react';
import ResourceTextInput from 'components/ResourceTextInput';
import classNames from 'classnames/bind';
import styles from 'css/components/entrybox';

const cx = classNames.bind(styles);

// Takes callback functions from props and passes it down to ResourceTextInput
// Essentially this is passing the callback function two levels down from parent
// to grandchild. To make it cleaner, you could consider:
// 1. moving `connect` down to this component so you could mapStateToProps and dispatch
// 2. Move ResourceTextInput up to EntryBox so it's less confusing
const EntryBox = ({onEntryChange, onEntrySave, resource}) => {
  return (
    <div className={cx('entrybox')}>
      <h1 className={cx('header')}>Splash for your top hack idea</h1>
      <ResourceTextInput
        className={cx('input')}
        value={resource}
        placeholder="Suggest a hackday idea . . ."
        onEntryChange={onEntryChange}
        onEntrySave={onEntrySave} />
    </div>
  );
};

EntryBox.propTypes = {
  resource: PropTypes.string,
  onEntryChange: PropTypes.func.isRequired,
  onEntrySave: PropTypes.func.isRequired
};

export default EntryBox;
