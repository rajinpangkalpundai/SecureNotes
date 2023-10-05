import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from '_navigations/Routes';

import ListNotes from '_screens/Notes/ListNotes';
import CreateNote from '_screens/Notes/CreateNote';
import EditNote from '_screens/Notes/EditNote';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator initialRouteName={routes.NOTES_LIST_SCREEN}>
      <Stack.Screen
        name={routes.NOTES_LIST_SCREEN}
        component={ListNotes}
        options={{ headerMode: 'none' }}
      />
      <Stack.Screen
        name={routes.CREATE_NOTE_SCREEN}
        component={CreateNote}
        options={{ headerTitle: 'Add Note' }}
      />
      <Stack.Screen
        name={routes.EDIT_NOTE_SCREEN}
        component={EditNote}
        options={{ headerTitle: 'Edit Note' }}
      />
    </Stack.Navigator>
  );
};
