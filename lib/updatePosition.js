import React from "react-native";

const {
  NativeModules: {
    UIManager
  }
} = React;

export default (ref, debug) => {
  const handle = React.findNodeHandle(ref);
  setTimeout(() => {
    UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      if (debug) {
        console.log(x, y, width, height, pageX, pageY);
      }
      ref.currentPosition(pageX, pageY);
    });
  }, 0);
};
