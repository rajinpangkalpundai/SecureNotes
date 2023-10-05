/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator } from 'react-native';

export default function ({ color }) {
  return (
    <ActivityIndicator
      size={'large'}
      color={color}
      style={{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
    />
  );
}
