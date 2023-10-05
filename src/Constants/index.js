import { Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android' ? true : false;
export const isIos = !isAndroid;

export const APP_STATE = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
};
