import React from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();
export const isMountedRef = React.createRef();

function navigate(routeName, params) {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.navigate(routeName, params);
  } else {
  }
}

function pop() {
  if (isMountedRef.current && navigationRef.current) {
    const popAction = StackActions.pop(1);

    navigationRef.current.dispatch(popAction);
  }
}

const NavigationService = {
  navigate,
  pop,
};

export default NavigationService;
