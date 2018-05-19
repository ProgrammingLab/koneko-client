import api from '@/api';

export default {
  namespaced: true,
  state: {
    contests: null,
    error: null,
  },
  getters: {
    activeContests(state, getters, rootState, rootGetters) {
      const serverTime = rootGetters['koneko/timeDiff/serverTime'];
      const contests = state.contests;
      if (contests) {
        return contests.filter(c =>
          serverTime.isSameOrAfter(c.startAt) && serverTime.isBefore(c.endAt),
        );
      }
      return null;
    },
    upcomingContests(state, getters, rootState, rootGetters) {
      const serverTime = rootGetters['koneko/timeDiff/serverTime'];
      const contests = state.contests;
      if (contests) {
        return contests.filter(c => serverTime.isBefore(c.startAt));
      }
      return null;
    },
    recentContests(state, getters, rootState, rootGetters) {
      const serverTime = rootGetters['koneko/timeDiff/serverTime'];
      const contests = state.contests;
      if (contests) {
        return contests.filter(c =>
          serverTime.isSameOrAfter(c.endAt)).slice(0, Math.min(5, contests.length),
        );
      }
      return null;
    },
  },
  mutations: {
    setContests(state, contests) {
      state.contests = contests;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async fetchAllContests({ commit }) {
      try {
        const res = await api.getContests();
        commit('setContests', res.data);
        commit('setError', null);
      } catch (e) {
        commit('setContests', null);
        commit('setError', e);
      }
    },
  },
};
