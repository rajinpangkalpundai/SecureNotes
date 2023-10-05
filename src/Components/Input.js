import React from 'react';
import { TextInput } from 'react-native-paper';

export default ({
  label,
  value,
  onChangeText,
  placeholder,
  marginTop,
  underlineColor,
  activeUnderlineColor,
  outlineColor,
  activeOutlineColor,
  multiline,
  textContentType,
  mode,
}) => {
  return (
    <TextInput
      mode={mode}
      label={label}
      value={value}
      placeholder={placeholder}
      underlineColor={underlineColor}
      activeUnderlineColor={activeUnderlineColor}
      outlineColor={outlineColor}
      activeOutlineColor={activeOutlineColor}
      textContentType={textContentType}
      secureTextEntry={textContentType == 'password' ? true : false}
      style={{ marginTop: marginTop }}
      onChangeText={onChangeText}
      multiline={multiline}
    />
  );
};
