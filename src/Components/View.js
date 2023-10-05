import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { isIos } from '_constants';

export default ({ children, useSafeAreaView, style, ...other }) => {
  const Element = useSafeAreaView && isIos ? SafeAreaView : View;
  return (
    <Element style={style} {...other}>
      {children}
    </Element>
  );
};
