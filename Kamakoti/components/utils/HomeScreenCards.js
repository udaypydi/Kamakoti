import React , { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class HomeScreenCards extends Component {

  getColor() {
    let color = this.props.colorName;
    return color;
  }

  render() {
    return (
      <View style={[styles.container,{backgroundColor: this.getColor()}]}>
        <Icon name={this.props.iconName} size={30} color='#fff'/>
        <Text style={styles.textStyle}> {this.props.cardText} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'rgba(222, 158, 54,0.7)',
    alignItems: 'center',
    padding: 3,
  },

  textStyle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  }
})
