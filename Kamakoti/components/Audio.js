import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Alert,
  Modal,
  ToastAndroid,
  Platform,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { ReactNativeAudioStreaming } from 'react-native-audio-streaming';
import audio from './resources/audio.json';

export default class Audio extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      playButtonVisible: false,
      audioURL: '',
      modalVisible: false,
      audioPlayed: false,
      albumName: '',
      albumData: ''
    };

    this.renderRow = this.renderRow.bind(this);
    this.gotToHomePage = this.gotToHomePage.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.pauseAudio = this.pauseAudio.bind(this);
  }

  componentWillMount() {
    this.setState({
      albumData: audio.audio,
      dataSource: this.state.dataSource.cloneWithRows(audio.audio)
    });
  }

  gotToHomePage() {
    this.props.navigator.pop({
      name: 'Main',
    });
  }

  renderRow(rowData) {
    return (
      <View>
        <TouchableOpacity onPress={() => {
          this.setState({ playButtonVisible: true, audioURL: rowData.audioURL, modalVisible: true, albumName: rowData.audioName, flexDirection: 'row'})
        }}>
        <View style={{ alignItems:'center'}}>
          <View style={styles.audioCard}>
              <Icon
              name={'play'}
              size={40}
              color='#000'
              style={{
                flex: 1,
                justifyContent: 'center',
                marginTop: Dimensions.get('window').height / 10,
                marginLeft: Dimensions.get('window').width / 5
              }}
              />
            <View style={{ backgroundColor: 'rgba(71, 67, 67, 0.5)', padding: 5}}>
            <Text style={{ marginLeft : 20 , justifyContent: 'flex-end'}}>{rowData.audioName}</Text>
            </View>
          </View>
        </View>
        </TouchableOpacity>
      </View>
    );
  }

  playAudio() {
    if (Platform.Os === 'android') {
      ToastAndroid.show(' Playing audio file ', ToastAndroid.SHORT);
    }
    this.setState({ audioPlayed: true });
    ReactNativeAudioStreaming.play(this.state.audioURL, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
  }

  pauseAudio() {
    this.setState({ audioPlayed: false })
    ReactNativeAudioStreaming.pause();
  }

  render() {
    return (
      <View>
      <View style={styles.tabBar}>
        <Text style={{color: '#fff', fontSize: 20}}> { '< ' }</Text>
          <TouchableOpacity onPress={this.gotToHomePage} style={{flexDirection: 'row'}}>
            <Icon name={'home'} size={25} color='#fff'/>
          </TouchableOpacity>
          <Text style={styles.titleText}>Audio</Text>
      </View>
      <Modal
          transparent={true}
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            ReactNativeAudioStreaming.stop();
            this.setState({ modalVisible: false, playButtonVisible: false, audioPlayed: false })
          }}
          style={{backgroundColor: 'rgba(255,255,255,0)'}}
      >
      <View style={{
          height: 100,
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center'}}
       >
       <Text style={{fontSize: 20, fontWeight: 'bold', margin: 20}}>{this.state.albumName}</Text>
       {!this.state.audioPlayed &&
         <TouchableOpacity onPress={this.playAudio}>
          <Icon name={'play'} size={25} color='#000'/>
        </TouchableOpacity>
       }
       {this.state.audioPlayed &&
           <TouchableOpacity onPress={this.pauseAudio}>
            <Icon name={'pause'} size={25} color='#000'/>
          </TouchableOpacity>
       }
      </View>
      </Modal>
      {!this.state.playButtonVisible &&
        <ListView
            contentContainerStyle={styles.firstList}
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

  audioCard: {
    flex: 1,
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width / 2.2,
    backgroundColor: '#DEB078',
    margin: 5,
    justifyContent: 'center'
  },

  firstList: {
    marginLeft: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
