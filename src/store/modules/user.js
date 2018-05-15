export default {
  namespaced: true,
  state: {
    id: null,
    displayName: '',
    name: '',
    email: '',
  },
  mutations: {
    setUserInfo(state, user) {
      if (user) {
        state.id = user.id;
        state.displayName = user.displayName;
        state.name = user.name;
        state.email = user.email;
        return;
      }
      state.id = null;
      state.displayName = '';
      state.name = '';
      state.email = '';
    },
  },
};
