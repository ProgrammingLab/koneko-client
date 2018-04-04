import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Top from '@/components/Top';

Vue.use(Router);

export default new Router({
// TODO:権限の確認とログインページの読み飛ばしやって
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});
