 import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Communications from 'react-native-communications';
import HomeScreenCards from './components/utils/HomeScreenCards';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorName: 'rgba(182, 95, 51, 0.5)',
    };

    this.navigateToAbout = this.navigateToAbout.bind(this);
    this.navigateToPujas = this.navigateToPujas.bind(this);
    this.navigateToPhotos = this.navigateToPhotos.bind(this);
    this.navigateToAudio = this.navigateToAudio.bind(this);
    this.navigateToVideo = this.navigateToVideo.bind(this);
    this.navigateToMailingList = this.navigateToMailingList.bind(this);
    this.navigateToWeb = this.navigateToWeb.bind(this);
    this.navigateToFaceBook = this.navigateToFaceBook.bind(this);
    this.navigateToBooks = this.navigateToBooks.bind(this);
    this.navigateToSeva = this.navigateToSeva.bind(this);
    this.navigateToTour = this.navigateToTour.bind(this);
    this.navigateToLocation = this.navigateToLocation.bind(this);
    this.navigateToLinks = this.navigateToLinks.bind(this);
    this.navigateToGuide = this.navigateToGuide.bind(this);
  }

  navigateToAbout() {
    this.props.navigator.push({
      name: 'AboutUs',
    });
  }

  navigateToPujas() {
    this.props.navigator.push({
      name: 'Pujas',
    });
  }

  navigateToPhotos() {
    this.props.navigator.push({
      name: 'Photos',
    });
  }

  navigateToAudio() {
    this.props.navigator.push({
      name: 'Audio',
    });
  }

  navigateToVideo() {
    this.props.navigator.push({
      name: 'Video',
    });
  }

  navigateToMailingList() {
    this.props.navigator.push({
      name: 'MailingList',
    });
  }

  navigateToWeb() {
    Linking.openURL('http://www.kamakoti.org/');
  }

  navigateToFaceBook() {
    this.props.navigator.push({
      name: 'Facebook',
    });
  }

  navigateToBooks() {
    this.props.navigator.push({
      name: 'Books',
    });
  }

  navigateToSeva() {
    this.props.navigator.push({
      name: 'ESeva',
    });
  }

  navigateToTour() {
    this.props.navigator.push({
      name: 'Tour',
    });
  }

  navigateToLocation() {
    this.props.navigator.push({
      name: 'Location',
    })
  }

  navigateToLinks() {
    this.props.navigator.push({
      name: 'Links',
    });
  }

  navigateToGuide() {
    this.props.navigator.push({
      name: 'Guide',
    });
  }

  render() {
    return (
        <Image style={styles.backgroundImage} source={require('./img/adi-shankara.jpg')}>
          <View style={styles.tabBar}>
            <Text style={styles.titleStyles}>KAMAKOTI</Text>
          </View>
            <ScrollView>
                <View style={styles.cardStyles}>
                  <TouchableOpacity onPress={this.navigateToAbout} style={{ flex: 1}}>
                    <HomeScreenCards cardText={'About Us'} iconName={'md-home'} colorName={this.state.colorName}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.navigateToPujas} style={{ flex: 1}}>
                    <HomeScreenCards cardText={'Pujas & Events Calendar'} iconName={'md-calendar'} colorName={this.state.colorName}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.navigateToPhotos} style={{ flex: 1}}>
                    <HomeScreenCards cardText={'Photos'} iconName={'md-photos'} colorName={this.state.colorName}/>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardStyles}>
                  <TouchableOpacity onPress={this.navigateToAudio} style={{ flex: 1}}>
                    <HomeScreenCards cardText={'Audio'} iconName={'md-volume-up'} colorName={this.state.colorName}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.navigateToFaceBook} style={{ flex: 1}}>
                    <HomeScreenCards cardText={'Facebook'} iconName={'logo-facebook'} colorName={this.state.colorName}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.navigateToBooks} style={{ flex: 1}}>
                    <HomeScreenCards cardText={'Books'} iconName={'md-book'} colorName={this.state.colorName}/>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardStyles}>
                <TouchableOpacity onPress={this.navigateToMailingList} style={{ flex: 1}}>
                  <HomeScreenCards cardText={'Register on Mailing List'} iconName={'md-bookmarks'} colorName={this.state.colorName}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.navigateToTour} style={{ flex: 1}}>
                  <HomeScreenCards cardText={'Tour Programme'} iconName={'md-map'} colorName={this.state.colorName}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.navigateToSeva} style={{ flex: 1}}>
                  <HomeScreenCards cardText={'eSeva'} iconName={'md-card'} colorName={this.state.colorName}/>
                </TouchableOpacity>
                </View>
                <View style={styles.cardStyles}>
                <TouchableOpacity onPress={() => Communications.phonecall('04427222115', true)} style={{ flex: 1}}>
                  <HomeScreenCards cardText={'Call Us'} iconName={'md-call'} colorName={this.state.colorName}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.navigateToLocation} style={{ flex: 1}}>
                  <HomeScreenCards cardText={'Contact Us'} iconName={'md-mail-open'} colorName={this.state.colorName}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.navigateToWeb} style={{ flex: 1}}>
                  <HomeScreenCards cardText={'Web Page'} iconName={'md-globe'} colorName={this.state.colorName}/>
                </TouchableOpacity>
                </View>
                <View style={styles.cardStyles}>
                  <TouchableOpacity onPress={this.navigateToLinks} style={{ flex: 1}}>
                    <HomeScreenCards cardText={'Related Links'} iconName={'md-bookmarks'} colorName={this.state.colorName}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.navigateToGuide} style={{ flex: 1}}>
                    <HomeScreenCards cardText={'Kanchipuram Guide'} iconName={'md-compass'} colorName={this.state.colorName}/>
                  </TouchableOpacity>
                </View>
            </ScrollView>
        </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage:{
    flex: 1,
    width: null,
    height: null,
  },

  tabBar: {
    padding: 20,
    backgroundColor: '#DEB078',
    alignItems: 'center',
  },

  cardStyles: {
    height: 121,
    flexDirection: 'row',
  },

  titleStyles: {
    color: 'white',
    fontSize: 15,
  }
});
