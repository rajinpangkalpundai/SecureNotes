import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import LoginStack from './LoginStack';
import NotesStack from './NotesStack';

import routes from '_navigations/Routes';
import { useStoreState } from 'easy-peasy';

import { APP_STATE } from '_constants';

const Stack = createStackNavigator();

export default () => {
  const appState = useStoreState((state) => state.login.appState);

  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerMode: 'screen',
      }}>
      {appState == APP_STATE.PUBLIC ? (
        <Stack.Screen
          options={{ headerShown: false }}
          name={routes.LOGIN_STACK}
          component={LoginStack}
        />
      ) : (
        <Stack.Screen
          options={{ headerShown: false }}
          name={routes.NOTES_STACK}
          component={NotesStack}
        />
      )}
    </Stack.Navigator>
  );
};
