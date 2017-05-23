import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import KamakotiHomeScreen from './Router';

export default class Kamakoti extends Component {
  render() {
    return (
      <KamakotiHomeScreen/>
    );
  }
}

AppRegistry.registerComponent('Kamakoti', () => Kamakoti);
