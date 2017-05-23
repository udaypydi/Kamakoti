import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class AboutUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      descriptionText: '',
      imageURL: '',
      isSpinnerVisible: true,
    };

    this.gotToHomePage = this.gotToHomePage.bind(this);
    this.getDescription = this.getDescription.bind(this);
  }

  componentWillMount() {
    this.getDescription();
  }

  gotToHomePage() {
    this.props.navigator.pop({
      name: 'Main',
    });
  }

  async getDescription() {
      let response = await fetch('https://files.backand.io/kanchikamakotipeetham/aboutUs.json');
      let responseJson = await response.json();
      this.setState({
        imageURL: responseJson.aboutUs.imageURL,
        descriptionText: responseJson.aboutUs.description,
        isSpinnerVisible: false,
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
          <Text style={styles.titleText}>About Us</Text>
      </View>
      {this.state.isSpinnerVisible &&
        <ActivityIndicator
          animating={this.state.isSpinnerVisible}
          style={[styles.centering, {height: 80}]}
          size="large"
        />
      }
      <ScrollView style={{ backgroundColor: 'rgba(255, 168, 92,0.5)'}}>
      <Image source={{uri: this.state.imageURL }} style={{height:400, width: 350, margin: 10}}/>
      {!this.state.isSpinnerVisible &&
        <Text style={{ fontWeight: 'bold', fontSize: 20, margin: 10}}> About Us</Text>
      }
      <Text style={{margin: 5}}>{this.state.descriptionText}</Text>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 168, 92,0.5)',
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

  centering: {
   alignItems: 'center',
   justifyContent: 'center',
   padding: 8,
 },
});
