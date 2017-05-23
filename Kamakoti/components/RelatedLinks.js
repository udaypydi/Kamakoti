import React, { Component } from 'react';

import {
  View,
  ListView,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Modal,
  WebView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import LoadLinks from './DisplayRelatedLinks';
import links from './resources/relatedLinks.json';

export default class RelatedLinks extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      isLinkClicked: false,
      linkName: '',
      link: '',
      modalVisible: false,
    };

    this.gotToHomePage = this.gotToHomePage.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.loadClickedLink = this.loadClickedLink.bind(this);
  }

  componentWillMount() {
    this.setState({
      albumData: links.links,
      dataSource: this.state.dataSource.cloneWithRows(links.links),
      animating: false,
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
      <TouchableOpacity style={styles.listViewBackground} onPress={() => {this.setState({ modalVisible: true, link: rowData.linkUrl })}}>
        <View style={{flexWrap: 'wrap'}}>
          <Text style={styles.listViewData}>{rowData.linkName}</Text>
        </View>
      </TouchableOpacity>
      </View>
    );
  }

  loadClickedLink(rowData) {
    this.setState({
      linkName: rowData.linkName,
      link: rowData.linkUrl,
      isLinkClicked: true,
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
              <Text style={styles.titleText}>Related Links</Text>
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
                source={{uri: this.state.link }}
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
