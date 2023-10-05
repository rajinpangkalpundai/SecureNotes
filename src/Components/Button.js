import React from 'react';
import { View } from 'react-native';
import { Button, Text, TouchableRipple } from 'react-native-paper';

export function TextButton({
  style,
  label,
  fontSize,
  fontFamily,
  color,
  marginLeft,
  marginBottom,
  disabled,
  onPress,
}) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: marginLeft,
        marginBottom: marginBottom,
      }}>
      <TouchableRipple onPress={onPress} disabled={disabled}>
        <Text
          style={[
            {
              fontSize: fontSize,
              fontFamily: fontFamily,
              color: color,
            },
            style,
          ]}>
          {label}
        </Text>
      </TouchableRipple>
    </View>
  );
}

export default ({
  padding,
  marginTop,
  onPress,
  label,
  fontSize,
  fontFamily,
  mode,
  color,
  disabled,
  icon,
}) => {
  return (
    <Button
      style={{
        padding: padding,
        marginTop: marginTop,
        borderWidth: mode === 'outlined' ? 1.2 : 0,
      }}
      mode={mode}
      labelStyle={{
        fontSize: fontSize,
        fontFamily: fontFamily,
      }}
      icon={icon}
      uppercase={false}
      color={color}
      onPress={onPress}
      disabled={disabled}>
      {label}
    </Button>
  );
};
