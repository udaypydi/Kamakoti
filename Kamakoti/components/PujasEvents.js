import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';

import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Ionicons';

export default class PujasEvents extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      items: [],
      animating: true,
    };

    this.gotToHomePage = this.gotToHomePage.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }

  componentWillMount() {
    this.getEvents();
  }

  async getEvents() {
    try {
      let response = await fetch('https://files.backand.io/kanchikamakotipeetham/events.json');
      let responseJson = await response.json();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseJson.events.data),
        animating: false,
      });
    } catch (err) {
      console.log('erro fetching events data', err);
    }
  }

  gotToHomePage() {
    this.props.navigator.pop({
      name: 'Main',
    });
  }

  renderRow(rowData) {
    return (
      <View style={styles.eventCard}>
        <View style={styles.titleCard}>
          <Icons name={'md-calendar'} size={20} color='rgba(255, 255, 255, 1)'/>
          <Text style={{marginLeft: 5,fontSize: 15, fontWeight: 'bold', color: '#fff'}}>{rowData.name}</Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 10}}>
        <Text>{rowData.Date}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
      <View style={styles.tabBar}>
        <Text style={{color: '#fff', fontSize: 20}}> { '< ' }</Text>
          <TouchableOpacity onPress={this.gotToHomePage} style={{flexDirection: 'row'}}>
            <Icon name={'home'} size={25} color='#fff'/>
          </TouchableOpacity>
          <Text style={styles.titleText}>Pujas & Events </Text>
      </View>
      {this.state.animating &&
        <ActivityIndicator
          animating={this.state.animating}
          style={[styles.centering, {height: 80}]}
          size="large"
        />
      }
      {!this.state.animating &&
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections
        />
      }
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

  mediaPlayer: {
      width: 200,
      height: 100
    },
    eventCard: {
      padding: 10,
      backgroundColor: '#DEB078',
      margin: 5,
      borderRadius: 5,
    },
    titleCard: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#B65F33',
      padding: 10,
      borderRadius: 5
    },

    centering: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
    },
});
