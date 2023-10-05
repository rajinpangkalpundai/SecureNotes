import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import routes from '_navigations/Routes';

import Login from '_screens/Login';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName={routes.LOGIN_SCREEN}
      screenOptions={{ ...TransitionPresets.SlideFromRightIOS, headerMode: 'screen' }}>
      <Stack.Screen name={routes.LOGIN_SCREEN} component={Login} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
