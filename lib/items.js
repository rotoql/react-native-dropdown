import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Text
} from "react-native";

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  scrollView: {
    height: 120,
    width: 198
  },
  container: {
    position: 'absolute',
    borderColor: '#BDBDC1',
    borderWidth: 2 / window.scale,
    borderTopColor: 'transparent',
  }
})

export default class Items extends Component {
  defaultProps = {
    width: 0,
    height: 0,
    positionX: 0,
    positionY: 0,
    show: false,
    onPress: () => {}
  };
  render() {
    const { items, positionX, positionY, show, onPress, width, height } = this.props;
    if (!show) {
      return null;
    }
    const renderedItems = React.Children.map(items, (item) => {
      return (
        <TouchableWithoutFeedback onPress={() => onPress(item.props.children, item.props.value) }>
          <View>
            {item}
          </View>
        </TouchableWithoutFeedback>
      );
    });
    return (
      <View style={[styles.container, { top: positionY, left: positionX }]}>
        <ScrollView
          style={{ width: width - 2, height: height * 3 }}
          automaticallyAdjustContentInsets={false}
          bounces={false}>
          {renderedItems}
        </ScrollView>
      </View>
    );
  }
}
