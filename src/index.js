import React from 'react';
import { enableScreens } from 'react-native-screens';

import Root from './App';

enableScreens();

export default class App extends React.Component {
  render() {
    return <Root />;
  }
}
