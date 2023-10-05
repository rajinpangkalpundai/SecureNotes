import model from './Models';
import ConfigureStore from './ConfigureStore';

let store = null;

const createStore = () => {
  store = ConfigureStore(
    {
      ...model,
    },
  );

  return store;
};

export default createStore;
