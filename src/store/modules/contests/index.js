import api from '@/api';
import results from './results/';

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
    isWaitingJudge: true,
    error: null,
    duration: null,
    flexibleCreatedAt: null,
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
    isFlexibleContest({ duration }) {
      return !!duration;
    },
    flexibleEndAt({ flexibleCreatedAt, duration }) {
      if (flexibleCreatedAt === null) return null;
      const tmp = new Date(flexibleCreatedAt);
      tmp.setSeconds(tmp.getSeconds() + duration);
      return tmp;
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
        name: v.user.name, displayName: v.user.displayName, id: v.user.id,
      }));
      state.duration = contestData.duration ? contestData.duration / 1000000000 : null;
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
    setFlexibleCreatedAt(state, createdAt) {
      state.flexibleCreatedAt = createdAt;
    },
    waitJudge(state) {
      state.isWaitingJudge = true;
    },
    setParticipants(state, participants) {
      state.participants = participants.map(v => ({
        name: v.user.name, displayName: v.user.displayName, id: v.user.id,
      }));
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async getContest({ state, commit, rootState }, contestID) {
      try {
        const res = await api.getContest(rootState.koneko.sessionID, contestID);
        commit('setContestData', res.data);
        if (state.duration) {
          for (let i = 0; i < res.data.participants.length; i += 1) {
            if (rootState.koneko.user.id === res.data.participants[i].user.id) {
              commit('setFlexibleCreatedAt', new Date(res.data.participants[i].createdAt));
              break;
            }
          }
        }
        commit('setRequiredWatching', true);
      } catch (e) {
        commit('setError', e);
      }
    },
    async statusesWatcher({ commit, rootState, state }) {
      const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
      let count = 0;
      commit('setRequiredWatching', true);
      // statusesの監視用ループが回ってなかったら回す
      if (!state.statusesWatcherFlag) {
        commit('setStatusesWatcherFlag');
        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (
            state.requiredWatching &&
            state.problems !== null &&
            (state.isWaitingJudge || count > 30)
          ) {
            count = 0;
            try {
              // eslint-disable-next-line no-await-in-loop
              const statuses = await api.getContestStatuses(rootState.koneko.sessionID, state.id);
              commit('setStatuses', statuses.data);
            } catch (e) {
              commit('setError', e);
            }
          }
          // eslint-disable-next-line no-await-in-loop
          await sleep(2000);
          count += 1;
        }
      }
    },
    async enter({ commit, rootState, state }) {
      try {
        const res = await api.enterContest(rootState.koneko.sessionID, state.id);
        commit('setParticipants', res.data.participants);
        if (state.duration) {
          for (let i = 0; i < res.data.participants.length; i += 1) {
            if (rootState.koneko.user.id === res.data.participants[i].user.id) {
              commit('setFlexibleCreatedAt', new Date(res.data.participants[i].createdAt));
              break;
            }
          }
        }
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
            scoreTime: v.scoreTime,
          }))
        ;
        commit('setStandings', standings);
      } catch (e) {
        commit('setError', e);
      }
    },
    async submit({ commit, rootState, state }, data) {
      commit('waitJudge');
      try {
        api.submit(rootState.koneko.sessionID, data.value, state.problems[data.problemIndex].id);
      } catch (e) {
        commit('setError', e);
      }
    },
  },
  modules: {
    results,
  },
};
