import React, { Component } from 'react';

import {
  View,
  ListView,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Modal,
  WebView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import books from './resources/books.json';

let url = "http://docs.google.com/gview?embedded=true&url=";

export default class Books extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      modalVisible: false,
      bookUrl: '',
    };

    this.getBooks = this.getBooks.bind(this);
    this.gotToHomePage = this.gotToHomePage.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(books.books) });
  }

  gotToHomePage() {
    this.props.navigator.pop({
      name: 'Main',
    });
  }

  renderRow(rowData) {
    return (
      <View>
      <TouchableOpacity style={styles.listViewBackground} onPress={() => {this.setState({ modalVisible: true, bookUrl: rowData.bookURL })}}>
        <View style={{flexDirection: 'row'}}>
          <Icon name={'globe'} size={50} color={'#ffffff'} style={{padding: 5}}/>
          <Text style={styles.listViewData}>{rowData.bookName}</Text>
        </View>
      </TouchableOpacity>
      </View>
    );
  }

  async getBooks() {
    try {
      let response = await fetch('https://files.backand.io/kanchikamakotipeetham/books.json');
      let responseJson = await response.json();
      this.setState({ dataSource: this.state.dataSource.cloneWithRows(responseJson.books) });
    } catch (err){
      console.log('error',err);
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
          <Text style={styles.titleText}>Books</Text>
      </View>
      {this.state.modalVisible &&
        <Modal
            transparent={true}
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({ modalVisible: false })
            }}
            style={{backgroundColor: 'rgba(255,255,255,0)'}}
        >
          <WebView
            source={{uri: url + this.state.bookUrl }}
            startInLoadingState={true}
          />
        </Modal>
      }
      <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections
        />
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
  listViewData: {
    fontSize: 20,
    color: '#ffffff',
    padding: 10
  },
  listViewBackground: {
    flexDirection: 'row',
    backgroundColor: '#B65F33',
    margin: 5,
    borderRadius: 5,
  }
});
