import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import Image from 'react-image-component'
import classNames from 'classnames/bind';
import raisedHands from '../images/raised-hands.jpg'
import styles from 'css/components/splash';

const cx = classNames.bind(styles);

export default class About extends React.Component {

  render(){
    return (
      <div className={cx('about')}>
        <h1 className={cx('header')}>JustUs</h1>
        <div className={cx('description')}>
          <p>Safe solutions for when you need help</p>
        </div>
      
        <div className={cx('contribute')}>
          <p>What is JustUs? <br/>
          A forum for alternatives to calling police in a crisis situations.
          </p>
        </div>
      </div>
    )} ;
  };

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
