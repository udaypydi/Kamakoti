import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Image,
  WebView,
} from 'react-native';

import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome';
import FBSDK from 'react-native-fbsdk';
import VIDEOS from './resources/videos.json';

const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

export default class Videos extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      items: [],
    };

    this.gotToHomePage = this.gotToHomePage.bind(this);
    this._responseInfoCallback = this._responseInfoCallback.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    const infoRequest = new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'albums{link,videos{link}}' // what you want to get
          },
          access_token: {
            string: 'EAACEdEose0cBAAOxt1lGibBTk02K0pdiFX6ab3ZAaiAKllsOERziBpPvLwG8l2m02Ay3F4n0SBcutDzTg2yjTTsZCyOMZCnuTiCoDJeoRK2ZCWFiQLIJI6LxsmZC0E5eGkMqzy0imsPjZAkFzAuk4xG3ZBEXL8ij6eS4fOPgAECRZAYmdlrZAVSh439AhhLMzI9gp9H8LjcCKiQZDZD'
          }
        }
      },
      this._responseInfoCallback,
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  }

  _responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      // alert('Error fetching data: ' + error.toString());
      this.setState({ dataSource: this.state.dataSource.cloneWithRows(VIDEOS.videos.data) });
    } else {
      alert(JSON.stringify(result.albums.data));
      this.setState({ dataSource: this.state.dataSource.cloneWithRows(photos.albums.data)});
      alert('Success fetching data: ' + result.toString());
    }
  }

  gotToHomePage() {
    this.props.navigator.pop({
      name: 'Main',
    });
  }

  renderRow(rowData) {
    return (
      <View>
      <Video source={{uri: rowData.source}}
         style={styles.backgroundVideo}
         resizeMode="cover" repeat={true} key="video2"
      />
      </View>
    );
  }

  render() {
    return (
      <View>
      <View style={styles.tabBar}>
        <Text style={{color: 'rgba(59, 96, 165, 1)', fontSize: 20}}> { '< ' }</Text>
          <TouchableOpacity onPress={this.gotToHomePage} style={{flexDirection: 'row'}}>
            <Icon name={'home'} size={25} color='rgba(59, 96, 165, 1)'/>
          </TouchableOpacity>
          <Text style={styles.titleText}>Videos</Text>
      </View>
      <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections
        />
        <Text>{this.state.albumName}</Text>
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

  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
