import api from '@/api';

export default {
  namespaced: true,
  state: {
    createdAt: (new Date(0)),
    updatedAt: (new Date(0)),
    id: null,
    title: null,
    description: null,
    startAt: (new Date(0)),
    endAt: (new Date(0)),
    writers: [],
    problems: [],
    participants: [],
    statusesWatcherFlag: false,
    requiredWatching: false,
    isWaitingJudge: false,
    error: null,
  },
  getters: {
    isEntered({ participants }, _, rootState) {
      return participants.some(({ id }) => id === rootState.koneko.user.id);
    },
  },
  mutations: {
    setContestData(state, contestData) {
      state.createdAt = new Date(contestData.createdAt);
      state.updatedAt = new Date(contestData.updatedAt);
      state.startAt = new Date(contestData.startAt);
      state.endAt = new Date(contestData.endAt);
      state.title = contestData.title;
      state.id = contestData.id;
      state.description = contestData.description;
      state.problems = contestData.problems.map(v => ({ ...v, status: -1 }));
      state.writers = contestData.writers.map(v => ({ name: v.name, displayName: v.displayName }));
      state.participants = contestData.participants.map(v => ({
        name: v.name, displayName: v.displayName, id: v.id,
      }));
    },
    setStatusesWatcherFlag(state) {
      state.statusesWatcherFlag = true;
    },
    setRequiredWatching(state, isRequierd) {
      state.requiredWatching = isRequierd;
    },
    setStatuses(state, statuses) {
      statuses.forEach((statusElem) => {
        for (let i = 0; i < state.problems.length; i += 1) {
          if (state.problems[i].id === statusElem.problemID) {
            state.problems[i].status = statusElem.status;
          }
        }
      });
      state.isWaitingJudge = state.problems.some(({ status }) => status < 2 && status > -1);
    },
    setParticipants(state, participants) {
      state.participants = participants.map(v => ({
        name: v.name, displayName: v.displayName, id: v.id,
      }));
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async getContest({ commit, rootState, state }, contestID) {
      const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
      try {
        const res = await api.getContest(rootState.koneko.sessionID, contestID);
        commit('setContestData', res.data);
        commit('setRequiredWatching', true);
        // statusesの監視用ループが回ってなかったら回す
        if (!state.statusesWatcherFlag) {
          commit('setStatusesWatcherFlag');
          // eslint-disable-next-line no-constant-condition
          while (true) {
            if (state.requiredWatching) {
              // eslint-disable-next-line no-await-in-loop
              const statuses = await api.getContestStatuses(rootState.koneko.sessionID, state.id);
              commit('setStatuses', statuses.data);
            }
            // eslint-disable-next-line no-await-in-loop
            await sleep(state.isWaitingJudge ? 2000 : 60000);
          }
        } else {
        // すでにループが回っていたときはとりあえず現状を把握する
          const statuses = await api.getContestStatuses(rootState.koneko.sessionID, state.id);
          commit('setStatuses', statuses.data);
        }
      } catch (e) {
        commit('setError', e);
      }
    },
    async enter({ commit, rootState, state }) {
      try {
        const res = await api.enterContest(rootState.koneko.sessionID, state.id);
        commit('setParticipants', res.data.participants);
      } catch (e) {
        commit('setError', e);
      }
    },
  },
};
