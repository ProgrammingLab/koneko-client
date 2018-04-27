import api from '@/api';

export default {
  namespaced: true,
  state: {
    createdAt: null,
    updatedAt: null,
    title: null,
    description: null,
    startAt: null,
    endAt: null,
    writers: [],
    error: null,
  },
  mutations: {
    setContestData(state, contestData) {
      state.createdAt = new Date(contestData.createdAt);
      state.updatedAt = new Date(contestData.updatedAt);
      state.startAt = new Date(contestData.startAt);
      state.endAt = new Date(contestData.endAt);
      state.title = contestData.title;
      state.description = contestData.description;
      contestData.writers.forEach((v, i) => {
        state.writers[i] = {
          name: v.name,
          displayName: v.displayName,
        };
      });
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async getContest({ commit, rootState }, contestID) {
      try {
        const res = await api.getContest(rootState.koneko.sessionID, contestID);
        commit('setContestData', res.data);
      } catch (e) {
        commit('setError', e);
      }
    },
  },
};
