import React, { Component } from 'react';

import {
  View,
  Text,
  Navigator,
  BackAndroid,
  Platform
} from 'react-native';

import App from './App';
import AboutUs from './components/AboutUs';
import PujasEvents from './components/PujasEvents';
import Photos from './components/Photos';
import Audio from './components/Audio';
import Video from './components/Video';
import MailingList from './components/MailingList';
import FacebookPage from './components/FacebookPage';
import Books from './components/Books';
import ESeva from './components/ESeva';
import TourProgramme from './components/TourProgramme';
import ContactUs from './components/ContactUs';
import Links from './components/RelatedLinks';
import Guide from './components/KanchipuramGuide';

let _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

export default class Router extends Component {
  constructor(props) {
    super(props);

    this.renderScene = this.renderScene.bind(this);
    this.handleBack = (() => {
      if (this.navigator && this.navigator.getCurrentRoutes().length > 1){
        this.props.navigator.pop();
        return true; //avoid closing the app
      }

      return false; //close the app
    }).bind(this);
  }

  renderScene(route, navigator) {
    _navigator = navigator;
    if (route.name === 'Main') {
      return <App navigator={navigator} />;
    } else if (route.name === 'AboutUs') {
      return <AboutUs navigator={navigator} title='About Us'/>;
    } else if (route.name === 'Pujas') {
      return <PujasEvents navigator={navigator} title='Pujas & Events'/>;
    } else if (route.name === 'Photos') {
      return <Photos navigator={navigator} title='Photos'/>;
    } else if (route.name === 'Audio') {
      return <Audio navigator = {navigator} title='Audio'/>;
    } else if (route.name === 'Video') {
      return <Video navigator = {navigator} title='Video'/>;
    } else if (route.name === 'MailingList') {
      return <MailingList navigator= {navigator} title='Mailing List'/>;
    } else if (route.name === 'Facebook') {
      return <FacebookPage navigator={navigator} title='Facebook'/>;
    } else if (route.name === 'Books') {
      return <Books navigator={navigator} title='Books'/>;
    } else if (route.name === 'ESeva') {
      return <ESeva navigator={navigator} title='ESeva'/>;
    } else if (route.name === 'Tour') {
      return <TourProgramme navigator={navigator} title='Tour'/>;
    } else if (route.name === 'Location') {
      return <ContactUs navigator={navigator} title='Location'/>;
    } else if(route.name === 'Links') {
      return <Links navigator={navigator} title='Links'/>;
    } else if (route.name === 'Guide') {
      return <Guide navigator={navigator} title='Guide'/>;
    }
  }
  render() {
    return (
      <Navigator
        style={{flex: 1}}
        initialRoute={{ name: 'Main' }}
        renderScene = {this.renderScene}
        />
    );
  }
}
