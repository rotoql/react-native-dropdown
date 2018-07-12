import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Overlay from "./overlay";
import Items from "./items";
const window = Dimensions.get("window");

export default class OptionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      width: 0,
      height: 0,
      pageX: 0,
      pageY: 0,
      positionX: 0,
      positionY: 0,
      items: [],
      onSelect: () => {}
    };
  }

  currentPosition = (pageX, pageY) => {
    this.setState({
      pageX,
      pageY
    });
  };

  show = (items, positionX, positionY, width, height, onSelect) => {
    positionX = positionX - this.state.pageX;
    positionY = positionY - this.state.pageY;
    this.setState({
      positionX,
      positionY,
      width,
      height,
      items,
      onSelect,
      show: true
    });
  }

  onOverlayPress = () => {
    const { onSelect } = this.state;
    onSelect(null, null);
    this.setState({
      show: false
    });
  };

  onItemPress = (item, value) => {
    const { onSelect } = this.state;
    onSelect(item, value);

    this.setState({
      show: false
    });
  };

  render() {
    const {
      items,
      pageX,
      pageY,
      positionX,
      positionY,
      width,
      height,
      show
    } = this.state;
    return (
      <View>
        <Overlay
          pageX={pageX}
          pageY={pageY}
          show={show}
          onPress={this.onOverlayPress}
        />
        <Items
          items={items}
          positionX={positionX}
          positionY={positionY}
          width={width}
          height={height}
          show={show}
          onPress={this.onItemPress}
        />
      </View>
    );
  }
}
