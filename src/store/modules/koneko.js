import moment from 'moment';
import api from '@/api';
import dashboard from './dashboard';
import whiteEmails from './white-emails';
import users from './users';
import contests from './contests/';
import contestList from './contest-list';
import informationModal from './information-modal';
import deleteConfirmationModal from './delete-confirmation-modal';
import timeDiff from './timeDiff';
import user from './user';
import languages from './languages';

export default {
  namespaced: true,
  state: {
    sessionID: null,
    error: null,
    loginStatus: false,
    isAdmin: false,
  },
  mutations: {
    setSessionID(state, ID) {
      state.sessionID = ID;
    },
    setError(state, error) {
      state.error = error;
    },
    setLoginStatus(state, status) {
      state.loginStatus = status;
    },
    setIsAdmin(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      // エラーハンドリングの方法これでいいかわからない
      try {
        const res = await api.login(email, password);
        commit('setSessionID', res.data.token);
        commit('setError', null);
      } catch (e) {
        commit('setError', e);
      }
    },
    async logout({ commit, state }) {
      try {
        await api.logout(state.sessionID);
        commit('setSessionID', null);
        commit('setError', null);
      } catch (e) {
        commit('setError', e);
      }
    },
    async updateLoginStatus({ commit, state }) {
      if (!state.sessionID) {
        commit('setLoginStatus', false);
        commit('user/setUserInfo', null);
        return;
      }
      try {
        const res = await api.getSelf(state.sessionID);
        const isAdmin = res.data.authority === 1;
        const serverTime = res.headers.date;
        commit('setLoginStatus', true);
        commit('setIsAdmin', isAdmin);
        commit('timeDiff/setDiff', moment().diff(serverTime));
        commit('user/setUserInfo', res.data);
      } catch (e) {
        if (e.response.status !== 401) {
          // eslint-disable-next-line no-console
          console.error(e);
        }
        commit('user/setUserInfo', null);
        commit('setLoginStatus', false);
      }
    },
  },
  modules: {
    dashboard,
    whiteEmails,
    users,
    user,
    contests,
    contestList,
    informationModal,
    deleteConfirmationModal,
    timeDiff,
    languages,
  },
};
