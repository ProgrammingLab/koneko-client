import Vuex from 'vuex';
import Vue from 'vue';
import koneko from './modules/koneko';

Vue.use(Vuex);

export default new Vuex.Store({
  static: true,
  modules: {
    koneko,
  },
});
