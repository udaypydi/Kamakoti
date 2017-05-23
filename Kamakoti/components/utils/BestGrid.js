import React ,{Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import PhotoGrid from 'react-native-photo-grid';

class BestGrid extends Component {

  constructor() {
    super();
    this.state = { items: [] };
  }

  componentDidMount() {
    // Build an array of 60 photos
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return { id: i, src: this.props.imageURL }
    });
    this.setState({ items });
  }

  render() {
    return(
      <PhotoGrid
        data = { this.state.items }
        itemsPerRow = { 3 }
        itemMargin = { 1 }
        renderHeader = { this.renderHeader }
        renderItem = { this.renderItem }
      />
    );
  }

  renderHeader() {
    return(
      <Text>{"I'm on top!"}</Text>
    );
  }

  renderItem(item, itemSize) {
    return(
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize }}
        onPress = { () => {
          // Do Something
        }}>
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.src }}
        />
      </TouchableOpacity>
    )
  }

}

export default BestGrid;
