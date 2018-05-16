import moment from 'moment';

export default {
  namespaced: true,
  state: {
    timeDiff: 0,
  },
  mutations: {
    setDiff(state, diff) {
      state.timeDiff = diff;
    },
  },
  getters: {
    serverTime(state) {
      return moment().add(state.timeDiff);
    },
  },
};
