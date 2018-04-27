import api from '@/api';
import dashboard from './dashboard';
import whiteEmails from './white-emails';
import users from './users';
import informationModal from './information-modal';

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
    async updateLoginStatus({ commit, state }) {
      if (!state.sessionID) {
        commit('setLoginStatus', false);
        return;
      }
      try {
        const res = await api.getSelf(state.sessionID);
        const isAdmin = res.data.authority === 1;
        commit('setLoginStatus', true);
        commit('setIsAdmin', isAdmin);
      } catch (e) {
        if (e.response.status !== 401) {
          // eslint-disable-next-line no-console
          console.error(e);
        }
        commit('setLoginStatus', false);
      }
    },
  },
  modules: {
    dashboard,
    whiteEmails,
    users,
    informationModal,
  },
};
