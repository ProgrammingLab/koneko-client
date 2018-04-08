import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Admin from '@/components/admin/Admin';
import Top from '@/components/Top';
import NotFound from '@/components/404';

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
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
});
