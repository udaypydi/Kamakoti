import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  WebView,
  Dimensions,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class TourProgramme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      location: '',
      endDate: '',
      contactNo: [],
      isSpinnerVisible: true,
    };

    this.gotToHomePage = this.gotToHomePage.bind(this);
    this.getTourProgramme = this.getTourProgramme.bind(this);
  }

  componentWillMount() {
    this.getTourProgramme();
  }

  gotToHomePage() {
    this.props.navigator.pop({
      name: 'Main',
    });
  }


  async getTourProgramme() {
    try {
      let response = await fetch('https://files.backand.io/kanchikamakotipeetham/tourProgramme.json');
      let responseJson = await response.json();
      this.setState({
        name: responseJson.programme.name,
        location: responseJson.programme.location,
        endDate: responseJson.programme.endDate,
        contactNo: responseJson.programme.contactNo,
        isSpinnerVisible: false,
      });
    } catch (err) {
      console.log('error in loading tour data', err);
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.tabBar}>
        <Text style={{color: '#fff', fontSize: 20}}> { '< ' }</Text>
          <TouchableOpacity onPress={this.gotToHomePage} style={{flexDirection: 'row'}}>
            <Icon name={'home'} size={25} color='#fff'/>
          </TouchableOpacity>
          <Text style={styles.titleText}>Tour Programme</Text>
      </View>
      {!this.state.isSpinnerVisible &&
        <View>
          <View style={{backgroundColor: 'rgba(182, 95, 51, 0.5)', height: Dimensions.get('window').height / 5 ,margin: 10, justifyContent: 'center'}}>
            <Text style={{ fontSize: 25, color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>{this.state.name}</Text>
          </View>
          <View style={{ padding: 15, backgroundColor: '#DEB078', margin: 10, borderRadius: 10, flexDirection: 'row'}}>
            <Icon name={'map-marker'} size={25} color='#B65F33'/>
            <Text style={{fontSize: 18, color: '#000', marginLeft: 5}}>{this.state.location}</Text>
          </View>
          <View style={{ padding: 15, backgroundColor: '#DEB078', margin: 10, borderRadius: 10, flexDirection: 'row'}}>
            <Icon name={'calendar'} size={25} color='#B65F33'/>
            <Text style={{fontSize: 18, color: '#000', marginLeft: 5}}>{this.state.endDate}</Text>
          </View>
          <View style={{ padding: 15, backgroundColor: '#DEB078', margin: 10, borderRadius: 10, flexDirection: 'row'}}>
            <Icon name={'phone'} size={25} color='#B65F33'/>
            <Text style={{fontSize: 18, color: '#000', marginLeft: 5}}>{this.state.contactNo[0]}</Text>
          </View>
        </View>
      }
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
