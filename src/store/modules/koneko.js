import api from '@/api';
import dashboard from './dashboard';
import whiteEmails from './white-emails';
import users from './users';
import informationModal from './information-modal';
import deleteConfirmationModal from './delete-confirmation-modal';
import languages from './languages';

export default {
  namespaced: true,
  state: {
    sessionID: null,
    error: null,
    loginStatus: false,
    user: null,
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
    setUser(state, user) {
      state.user = user;
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
        commit('setUser', null);
        return;
      }
      try {
        const res = await api.getSelf(state.sessionID);
        const isAdmin = res.data.authority === 1;
        commit('setUser', res.data);
        commit('setLoginStatus', true);
        commit('setIsAdmin', isAdmin);
      } catch (e) {
        if (e.response.status !== 401) {
          // eslint-disable-next-line no-console
          console.error(e);
        }
        commit('setUser', null);
        commit('setLoginStatus', false);
      }
    },
  },
  modules: {
    dashboard,
    whiteEmails,
    users,
    informationModal,
    deleteConfirmationModal,
    languages,
  },
};
