import { action, thunk } from 'easy-peasy';

import { APP_STATE } from '_constants';

const loginUser = thunk(async (actions, payload, { dispatch, injections, getState }) => {
  actions.setPublicKey(payload);
  actions.changeAppState(APP_STATE.PRIVATE);
});

const logout = thunk(async (actions, payload, { dispatch, injections, getState }) => {
  actions.setPublicKey('');
  actions.changeAppState(APP_STATE.PUBLIC);
});

const LoginModel = {
  loginUser,
  logout,
  appState: APP_STATE.PUBLIC,
  publicKey: '',
  changeAppState: action((state, payload) => {
    state.appState = payload;
  }),
  setPublicKey: action((state, payload) => {
    state.publicKey = payload;
  }),
};

export default LoginModel;
