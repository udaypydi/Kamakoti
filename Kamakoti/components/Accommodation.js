import React, { Component } from 'react';

import {
  View,
  Text,
} from 'react-native';

export default class Accomodation extends Component {
  constructor(props) {
    super(props);

    this.gotToHomePage = this.gotToHomePage.bind(this);
  }

  gotToHomePage() {
    this.props.navigator.pop({
      name: 'Main',
    });
  }

  render() {
    <View>
      <Text>Accommodation in Kanchi & other centres</Text>
      <Text>
        Accommodation is provided to devotees visiting Srimatam at the Yatri Nivas on Sri Kamakshi Amman Sannadhi Street.
        One can contact the manager Sri Chandrashekar on mob. number 9994346996 to check the availability and make a booking.
      </Text>
    </View>
  }
}
