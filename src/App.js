import React, { useEffect } from 'react';
import { StoreProvider } from 'easy-peasy';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { View } from '_components';
import { navigationRef, isMountedRef } from '_navigations';
import routes from '_navigations/Routes';
import MainStack from '_navigations/MainStack';
import createStore from '_services';

const Stack = createStackNavigator();

const store = createStore();

export default () => {
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  return (
    <View style={{ flex: 1 }} useSafeAreaView>
      <StoreProvider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={routes.MAIN_STACK} component={MainStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
    </View>
  );
};
