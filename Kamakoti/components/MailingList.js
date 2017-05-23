import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Communications from 'react-native-communications';

export default class MailingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
      comments: '',
    };

    this.gotToHomePage = this.gotToHomePage.bind(this);
    this.joinKamakoti = this.joinKamakoti.bind(this);
  }

  gotToHomePage() {
    this.props.navigator.pop({
      name: 'Main',
    });
  }

  async joinKamakoti() {
    try {
      let response = await fetch('https://api.backand.com:443/1/objects/user_registeration', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'AnonymousToken': '05b37d86-ac8f-49a6-915c-145af020433d',
          'Cache-Control': 'no-cache=\"set-cookie\"'
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          comments: this.state.comments
        })
      });

      if (response.status === 200) {
        Alert.alert('Subscription Successfull');
      }
    } catch (err) {
      console.log('Error sending mail', err);
    }
    // Communications.email('udaypydi333@gmail.com',null,null,'Kamakotipeetham Registeration',`name: ${this.state.name} comments: ${this.state.comments}`);
  }

  render() {
    return (
      <View>
      <View style={styles.tabBar}>
        <Text style={{color: '#fff', fontSize: 20}}> { '< ' }</Text>
          <TouchableOpacity onPress={this.gotToHomePage} style={{flexDirection: 'row'}}>
            <Icon name={'home'} size={25} color='#fff'/>
          </TouchableOpacity>
          <Text style={styles.titleText}>Mailing List</Text>
      </View>
      <Text style={{fontSize: 20, color: 'rgba(59, 96, 165, 1)'}}> Mailing List</Text>
      <Text style={{margin: 5}}> Register to get periodic mail updates on pujas and events </Text>
      <View style={{backgroundColor: '#FFF8E8', padding: 5}}>
      <TextInput
        style={styles.textInput}
        placeholder={'Name'}
        onChangeText={(text) => this.setState({name: text})}
      />
      <TextInput
        style={styles.textInput}
        placeholder={'Email'}
        onChangeText={(text) => this.setState({email: text})}
      />
      <TextInput
        style={styles.textInput}
        placeholder={'Phone'}
        onChangeText={(text) => this.setState({phone: text})}
      />
      <TextInput
        style={[styles.textInput, {height: 120, justifyContent: 'flex-start', flexDirection: 'column'}]}
        placeholder={'Comments'}
        onChangeText={(text) => this.setState({comments: text})}
      />
      </View>
      <TouchableOpacity style={styles.buttonStyles} onPress={this.joinKamakoti}>
        <Text style={{color: '#fff', fontSize: 15}}> Join</Text>
      </TouchableOpacity>
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

  addressText: {
    borderRadius: 3,
    borderWidth: 3,
    borderColor: '#ccc',
    padding: 15,
  },

  textInput: {
    height: 40,
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    padding: 3
  },

  buttonStyles: {
    backgroundColor: 'rgb(59,148,239)',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 5,
  }
});
