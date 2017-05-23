import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSpinnerVisible: true,
      region: {
        latitude: 12.8434,
        longitude: 79.7008,
      },
    };

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
          <Text style={styles.titleText}>Location</Text>
      </View>
      <View style={{ padding: 15, backgroundColor: '#DEB078', margin: 10, borderRadius: 10, flexDirection: 'row'}}>
        <Icon name={'user'} size={25} color='#B65F33'/>
        <Text style={{fontSize: 18, color: '#000', marginLeft: 5}}> Sri Kanchi Kamakotipeetham </Text>
      </View>
      <View style={{ padding: 15, backgroundColor: '#DEB078', margin: 10, borderRadius: 10, flexDirection: 'row'}}>
        <Icon name={'phone'} size={25} color='#B65F33'/>
        <Text style={{fontSize: 18, color: '#000', marginLeft: 5}}> 044 2722 2115 </Text>
      </View>
      <View style={{ padding: 15, backgroundColor: '#DEB078', margin: 10, borderRadius: 10, flexDirection: 'row'}}>
        <Icon name={'chrome'} size={25} color='#B65F33'/>
        <Text style={{fontSize: 18, color: '#000', marginLeft: 5}}> www.kamakoti.org</Text>
      </View>
      <View style={{ padding: 15, backgroundColor: '#DEB078', margin: 10, borderRadius: 10, flexDirection: 'row'}}>
        <Icon name={'map-marker'} size={25} color='#B65F33'/>
        <Text style={{fontSize: 18, color: '#000', marginLeft: 5}}> 1, Salai Street, Kanchipuram 631502, Tamilnadu, India </Text>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mapViewStyles: {
    height: 260,
    alignItems: 'center'
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

  addressText: {
    borderRadius: 3,
    borderWidth: 3,
    borderColor: '#ccc',
    padding: 15,
  },
});
