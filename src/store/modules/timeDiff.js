export default {
  namespaced: true,
  state: {
    diff: 0,
  },
  mutations: {
    setDiff(state, diff) {
      state.diff = diff;
    },
  },
};
