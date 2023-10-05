import { createStore } from 'easy-peasy';
import Config from 'react-native-config';

export default (model) => {
  return createStore(model, {
    name: Config.APP_NAME,
  });
};
