import React, { Component } from "react";
import { View, NativeModules, findNodeHandle } from "react-native";
import { withApollo } from "react-apollo";

import Select from "./Select";
import Option from "./Option";
import OptionList from "./OptionList";

const { UIManager } = NativeModules;

const updatePosition = (ref, debug) => {
  const handle = findNodeHandle(ref);
  setTimeout(() => {
    UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      if (debug) {
        console.log(x, y, width, height, pageX, pageY);
      }
      ref.currentPosition(pageX, pageY);
    });
  }, 0);
};

export default withApollo(
  class AttributionDropdown extends Component {
    componentDidMount() {
      updatePosition(this.select, __DEV__);
      updatePosition(this.optionList, __DEV__);
      // TODO this.props.client.query get the list
    }

    getOptionList = () => {
      return this.optionList;
    };

    onSelect = source => this.props.setSource(source);

    render() {
      return (
        <View style={{ alignItems: "center" }}>
          <Select
            ref={ref => {
              this.select = ref;
            }}
            optionListRef={this.getOptionList}
            defaultValue="How did you hear about us?"
            onSelect={this.onSelect}
          >
            <Option>Facebook</Option>
            <Option>Twitter</Option>
            <Option>Google Search</Option>
            <Option>VSIN</Option>
            <Option>StatFox</Option>
            <Option>Sports Gambling Podcast</Option>
            <Option>Scores and Odds</Option>
            <Option>Ross Tucker</Option>
            <Option>Apple Search</Option>
            <Option>RJ Bell</Option>
            <Option>Web Banner</Option>
          </Select>
          <OptionList
            ref={ref => {
              this.optionList = ref;
            }}
          />
        </View>
      );
    }
  }
);
