import moment from 'moment';

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
  getters: {
    serverTime(state) {
      return moment().add(state.diff);
    },
  },
};
