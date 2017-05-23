import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen'
import KamakotiHomeScreen from './App';
import Router from './Router';

export default class Kamakoti extends Component {

  componentDidMount() {
    	 // do anything while splash screen keeps, use await to wait for an async task.
        setTimeout(() => SplashScreen.hide(), 2000);
  }

  render() {
    return (
      <Router/>
    );
  }
}

AppRegistry.registerComponent('Kamakoti', () => Kamakoti);
