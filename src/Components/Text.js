import React from 'react';
import { Text } from 'react-native';

export default ({
  style,
  flex,
  label,
  color,
  fontFamily,
  fontSize,
  marginVertical,
  marginHorizontal,
  marginTop,
  marginBottom,
  marginStart,
  marginEnd,
  textAlign,
}) => {
  return (
    <Text
      style={[
        {
          flex: flex,
          marginVertical: marginVertical,
          marginHorizontal: marginHorizontal,
          marginTop: marginTop,
          marginStart: marginStart,
          marginEnd: marginEnd,
          marginBottom: marginBottom,
          color: color,
          fontFamily: fontFamily,
          fontSize: fontSize,
          textAlign: textAlign,
        },
        style,
      ]}>
      {label}
    </Text>
  );
};
