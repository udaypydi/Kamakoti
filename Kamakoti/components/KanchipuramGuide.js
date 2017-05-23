import React, { Component } from 'react';

import {
  View,
  ListView,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Linking,
  WebView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Accommodation from './Accommodation';

export default class KanchipuramGuide extends Component {
  constructor(props) {
    super(props);

    this.gotToHomePage = this.gotToHomePage.bind(this);
  }

  gotToHomePage() {
    this.props.navigator.pop({
      name: 'Main',
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.tabBar}>
        <Text style={{color: '#fff', fontSize: 20}}> { '< ' }</Text>
          <TouchableOpacity onPress={this.gotToHomePage} style={{flexDirection: 'row'}}>
            <Icon name={'home'} size={25} color='#fff'/>
          </TouchableOpacity>
          <Text style={styles.titleText}>KanchiPuram Guide</Text>
      </View>
      <ScrollableTabView
        tabBarActiveTextColor='rgb(242,110,38)'
        tabBarUnderlineStyle={{backgroundColor: 'rgb(242,110,38)'}}
      >
      <WebView
        tabLabel={'Travel Directions'}
        source={{uri: 'https://files.backand.io/kanchikamakotipeetham/travelDirections.html'}}
        startInLoadingState={true}
      />
      <WebView
        tabLabel={'Accommodation'}
        source={{uri: 'https://files.backand.io/kanchikamakotipeetham/Accomdation.html'}}
        startInLoadingState={true}
      />
      <WebView
        tabLabel={'Temples'}
        source={{uri: 'http://www.kamakoti.org/kamakoti/visitors/temples%20in%20Kanchi.html'}}
        startInLoadingState={true}
      />
    </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleText: {
    marginLeft: 70,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },

  tabBar: {
    padding: 20,
    backgroundColor: '#DEB078',
    flexDirection: 'row',
  },
  listViewData: {
    fontSize: 20,
    color: '#ffffff',
    padding: 10
  },
  listViewBackground: {
    flexDirection: 'row',
    backgroundColor: 'rgb(59,148,239)',
    margin: 5,
    borderRadius: 5,
  }
});
