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
    problems: null,
    participants: [],
    standings: [],
    statusesWatcherFlag: false,
    requiredWatching: false,
    isWaitingJudge: false,
    error: null,
  },
  getters: {
    isWriter({ writers }, _, rootState) {
      return writers.some(({ id }) => id === rootState.koneko.user.id);
    },
    isEntered({ participants }, _, rootState) {
      return participants.some(({ id }) => id === rootState.koneko.user.id);
    },
    canEnter(_, { isWriter, isEntered }) {
      return !isEntered && !isWriter;
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
      state.problems = contestData.problems === null ?
        null :
        contestData.problems.map(v => ({ ...v, status: -1 }))
      ;
      state.writers = contestData.writers.map(v => ({
        name: v.name, displayName: v.displayName, id: v.id,
      }));
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
    setProblems(state, problems) {
      state.problems = problems.map(v => ({ ...v, status: -1 }));
    },
    setStandings(state, standings) {
      state.standings = standings;
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
    async getContest({ commit, rootState }, contestID) {
      try {
        const res = await api.getContest(rootState.koneko.sessionID, contestID);
        commit('setContestData', res.data);
        commit('setRequiredWatching', true);
      } catch (e) {
        commit('setError', e);
      }
    },
    async statusesWatcher({ commit, rootState, state }) {
      const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
      commit('setRequiredWatching', true);
      // statusesの監視用ループが回ってなかったら回す
      if (!state.statusesWatcherFlag) {
        commit('setStatusesWatcherFlag');
        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (state.requiredWatching && state.problems !== null) {
            try {
              // eslint-disable-next-line no-await-in-loop
              const statuses = await api.getContestStatuses(rootState.koneko.sessionID, state.id);
              commit('setStatuses', statuses.data);
            } catch (e) {
              commit('setError', e);
            }
          }
          // eslint-disable-next-line no-await-in-loop
          await sleep(state.isWaitingJudge ? 2000 : 60000);
        }
      } else {
      // すでにループが回っていたときはとりあえず現状を把握する
        try {
          // eslint-disable-next-line no-await-in-loop
          const statuses = await api.getContestStatuses(rootState.koneko.sessionID, state.id);
          commit('setStatuses', statuses.data);
        } catch (e) {
          commit('setError', e);
        }
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
    async getProblems({ commit, rootState, state }) {
      try {
        const res = await api.getContestProblems(rootState.koneko.sessionID, state.id);
        commit('setProblems', res.data);
      } catch (e) {
        commit('setError', e);
      }
    },
    async getStandings({ commit, rootState, state }) {
      const getDetailsArray = (details, problemsMap, length) => {
        const detailsArray = [];
        detailsArray.length = length;
        detailsArray.fill(null);
        details.forEach((v) => {
          detailsArray[problemsMap.get(v.problemID)] = v;
        });
        return detailsArray;
      };
      try {
        const users = (await api.getUsers(rootState.koneko.sessionID)).data;
        // dispatch('koneko/users/fetchUsers', null, { root: true })にしたらエラーハンドリングどうするって思ったから
        const usersMap = new Map(users.map(v => [v.id, v.displayName]));
        const problemsMap = new Map(state.problems.map((v, index) => [v.id, index]));
        const standings = (await api.getContestStandings(rootState.koneko.sessionID, state.id)).data
          .map(v => ({
            totalPoint: v.point,
            displayName: usersMap.get(v.userID),
            details: getDetailsArray(v.details, problemsMap, state.problems.length),
          }))
        ;
        commit('setStandings', standings);
      } catch (e) {
        commit('setError', e);
      }
    },
  },
};
