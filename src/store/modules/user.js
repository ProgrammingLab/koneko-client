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
      state.id = user.id;
      state.displayName = user.displayName;
      state.name = user.name;
      state.email = user.email;
    },
  },
};
