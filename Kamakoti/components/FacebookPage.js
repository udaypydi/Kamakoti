import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  WebView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class FacebookPage extends Component {
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
          <Text style={styles.titleText}>FacebookPage</Text>
      </View>
        <WebView
          source={{uri: 'https://www.facebook.com/srikamakoti/'}}
          startInLoadingState={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
});
