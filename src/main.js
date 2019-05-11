// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import VueHead from 'vue-head';
import VueClipboard from 'vue-clipboard2';
import VueHighlightJS from 'vue-highlightjs';
import 'highlightjs-themes/github.css';
import App from './App';
import router from './router';
import store from './store';

Vue.use(VueHead);
Vue.use(VueClipboard);
Vue.use(VueHighlightJS);

library.add(faSignInAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
