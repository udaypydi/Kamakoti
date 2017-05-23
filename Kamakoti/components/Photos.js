import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Image,
  ActivityIndicator,
  BackAndroid,
  Platform,
  Modal,
  Alert,
  Dimensions,
  ToastAndroid,
} from 'react-native';

import ImagePreview from 'react-native-image-preview';
import Icon from 'react-native-vector-icons/FontAwesome';
import photos from './resources/photos.json';


export default class Photos extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      animating: true,
      visible: false,
      pictureUrl: '',
      isAlbumClicked: false,
      albumDataSource: ds.cloneWithRows([]),
    };

    this.getPhotos = this.getPhotos.bind(this);
    this.gotToHomePage = this.gotToHomePage.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.setVisibleToFalse = this.setVisibleToFalse.bind(this);
    this.renderAlbumRow = this.renderAlbumRow.bind(this);
  }

  componentWillMount() {
    if (Platform.Os === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
    }
    this.getPhotos();
  }

  componentWillUnmount() {
    if (Platform.Os === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.handleBack);
    }
  }

  gotToHomePage() {
    this.props.navigator.pop()
  }

  setVisibleToFalse() {
    this.setState({ visible: false });
  }

  async getPhotos() {
    try {
      let response = await fetch('https://files.backand.io/kanchikamakotipeetham/fbphotos.json');
      let responseJson = await response.json();
      this.setState({
        animating: false,
        dataSource: this.state.dataSource.cloneWithRows(photos.photos)
      });
      this.parseHTML();
    } catch (err) {
      console.log('error in loading audio files', err);
    }
  }

  renderRow(rowData) {
    return (
      <View style={{ margin: 5 }}>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              isAlbumClicked: true,
              albumDataSource: this.state.albumDataSource.cloneWithRows(rowData.albumURL)
            })}
        }>
          <View>
              <Image
                source={{ uri: rowData.albumURL[0]}}
                style={{ flex: 1, height: Dimensions.get('window').height / 4, width: Dimensions.get('window').width / 2.2, justifyContent: 'flex-end'}}
              >
              <View style={{ backgroundColor: 'rgba(71, 67, 67, 0.5)'}}>
                <Text style={{ color: '#fff', justifyContent: 'flex-end'}}>{rowData.albumName}</Text>
              </View>
              </Image>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderAlbumRow(rowData) {
    return (
      <View>
        <TouchableOpacity onPress={() => {
          this.setState({
            pictureUrl: rowData,
            visible: true,
          })}
        }>
          <Image
            source={{ uri: rowData}}
            style={{ height: 100, width: 100, margin: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.tabBar}>
        <Text style={{color: '#fff', fontSize: 20}}> { '< ' }</Text>
          <TouchableOpacity onPress={this.gotToHomePage} style={{flexDirection: 'row'}}>
            <Icon name={'home'} size={25} color='#fff'/>
          </TouchableOpacity>
          <Text style={styles.titleText}>Photos</Text>
      </View>
      {this.state.animating &&
        <ActivityIndicator
          animating={this.state.animating}
          style={[styles.centering, {height: 80}]}
          size="large"
        />
      }
      <Modal
          transparent={true}
          animationType={"slide"}
          transparent={false}
          visible={this.state.isAlbumClicked}
          onRequestClose={() => {
            this.setState({ isAlbumClicked: false })
          }}
          style={{backgroundColor: 'rgba(255,255,255,0)'}}
      >
        <View style={styles.tabBar}>
          <Text style={{color: '#fff', fontSize: 20}}> { '< ' }</Text>
            <TouchableOpacity onPress={() => this.setState({ isAlbumClicked: false })} style={{flexDirection: 'row'}}>
              <Icon name={'home'} size={25} color='#fff'/>
            </TouchableOpacity>
            <Text style={styles.titleText}>Photos</Text>
        </View>
        <View>
          <ListView
              contentContainerStyle={styles.list}
              dataSource={this.state.albumDataSource}
              renderRow={this.renderAlbumRow}
              enableEmptySections
            />
        </View>
      </Modal>
      <ImagePreview visible={this.state.visible} source={{uri: this.state.pictureUrl}} close={this.setVisibleToFalse} />

      {!this.state.animating &&
          <ListView
              contentContainerStyle={styles.firstList}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
            />
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(76, 72, 72)'
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

  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  firstList: {
    marginLeft: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  list: {
    marginLeft: 30,
    flexDirection: 'row',
    flexWrap: 'wrap'
    },
});
