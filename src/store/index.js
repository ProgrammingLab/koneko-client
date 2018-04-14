import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
import koneko from './modules/koneko';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState({
      paths: ['koneko.sessionID'],
      storage: window.sessionStorage,
    }),
  ],
  modules: {
    koneko,
  },
});
