import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type, active }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    // case 'home':
    //   imageSource = require('../assets/panel/home.png');
    //   active && iconStyle.push(styles.active);
    //   break;
    case 'close':
        imageSource = require('../assets/common/close.png');
    break;
  
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  active: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#e1251b',
  },
  closeIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#e1251b',
  },
  backIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#e1251b',
  },
  arrowIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#e1251b',
  },
  lifeIcon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#d6d1d0',
  }
});

export default Icons;
