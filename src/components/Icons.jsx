import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type, active }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case 'home':
      imageSource = require('../assets/panel/home.png');
      active && iconStyle.push(styles.active);
      break;
    case 'history':
      imageSource = require('../assets/panel/history.png');
      active && iconStyle.push(styles.active);
      break;
    case 'craft':
      imageSource = require('../assets/panel/craft.png');
      active && iconStyle.push(styles.active);
      break;
    case 'settings':
      imageSource = require('../assets/panel/settings.png');
      active && iconStyle.push(styles.active);
      break;
    case 'book':
      imageSource = require('../assets/panel/book.png');
      active && iconStyle.push(styles.active);
      break;
    case 'close':
        imageSource = require('../assets/common/close.png');
    break;
    case 'heart':
        imageSource = require('../assets/common/heart.png');
    break;
    case 'heart-grey':
        imageSource = require('../assets/common/heart-grey.png');
    break;
    case 'hint':
        imageSource = require('../assets/common/hint.png');
    break;
    case 'back':
        imageSource = require('../assets/common/back.png');
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
    tintColor: '#fff',
  },
});

export default Icons;
