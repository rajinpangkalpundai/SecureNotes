import React from 'react';
import { View } from 'react-native';
import colors from '_styles/Colors';

export default ({
  style,
  backgroundColor,
  borderRadius,
  borderTopStartRadius,
  borderTopEndRadius,
  flex,
  rowFlexDirection,
  justifyContent,
  alignItems,
  paddingTop,
  paddingHorizontal,
  paddingVertical,
  marginVertical,
  marginHorizontal,
  elevation,
  ...other
}) => {
  return (
    <View
      style={[
        {
          flex: flex,
          flexDirection: rowFlexDirection ? 'row' : 'column',
          justifyContent: justifyContent,
          alignItems: alignItems,
          paddingTop: paddingTop,
          paddingHorizontal: paddingHorizontal,
          paddingVertical: paddingVertical,
          marginVertical: marginVertical,
          marginHorizontal: marginHorizontal,
          backgroundColor: backgroundColor === null ? colors.transparent : backgroundColor,
          borderRadius: borderRadius,
          borderTopStartRadius: borderTopStartRadius,
          borderTopEndRadius: borderTopEndRadius,
          elevation: elevation,
        },
        style,
      ]}
      {...other}
    />
  );
};
