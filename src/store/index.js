import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import dashboard from './modules/dashboard';
import whiteEmails from './modules/white-emails';

Vue.use(Vuex);

export default new Vuex.Store({
  static: true,
  modules: {
    auth,
    dashboard,
    whiteEmails,
  },
});
