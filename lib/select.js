import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";

import Option from "./option";

const window = Dimensions.get("window");

const SELECT = "SELECT";

const styles = StyleSheet.create({
  container: {
    borderColor: "#BDBDC1",
    borderWidth: 2 / window.scale
  }
});

export default class Select extends Component {
  defaultProps = {
    width: 200,
    height: 40,
    onSelect: () => {}
  };

  constructor(props) {
    super(props);
    this.pageX = 0;
    this.pageY = 0;
    let defaultValue = props.defaultValue;
    if (!defaultValue) {
      if (Array.isArray(props.children)) {
        defaultValue = props.children[0].props.children;
      } else {
        defaultValue = props.children.props.children;
      }
    }

    this.state = {
      value: defaultValue
    };
  }

  reset = () => {
    const { defaultValue } = this.props;
    this.setState({ value: defaultValue });
  };

  currentPosition = (pageX, pageY) => {
    this.pageX = pageX;
    this.pageY = pageY + this.props.height;
  };

  onPress = () => {
    const { optionListRef, children, onSelect, width, height } = this.props;

    if (!children.length) {
      return false;
    }

    optionListRef().show(
      children,
      this.pageX,
      this.pageY,
      width,
      height,
      (item, value = item) => {
        if (item) {
          onSelect(value);
          this.setState({
            value: item
          });
        }
      }
    );
  };

  render() {
    const {
      width,
      height,
      children,
      defaultValue,
      style,
      styleOption,
      styleText
    } = this.props;
    const dimensions = { width, height };
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View
          ref={ref => {
            this.select = ref;
          }}
          style={[styles.container, style, dimensions]}
        >
          <Option style={styleOption} styleText={styleText}>
            {this.state.value}
          </Option>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
