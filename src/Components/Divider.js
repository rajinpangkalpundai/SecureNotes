import React from 'react';
import { Divider } from 'react-native-paper';

export default ({ style, flex, borderWidth, borderColor }) => {
  return (
    <Divider
      style={[
        {
          flex: flex == null ? 1 : flex,
          borderWidth: borderWidth == null ? 0.4 : borderWidth,
          borderColor: borderColor,
          backgroundColor: 'transparent',
        },
        style,
      ]}
    />
  );
};
