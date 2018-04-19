import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Admin from '@/components/admin/Admin';
import Top from '@/components/Top';
import Contest from '@/components/contest/Contest';
import NotFound from '@/components/NotFound';
import store from '@/store';

Vue.use(Router);

const router = new Router({
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
      path: '/Contest',
      name: 'Contest',
      component: Contest,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: { requiresAuth: true, admin: true },
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('koneko/updateLoginStatus');
  const { loginStatus, isAdmin } = store.state.koneko;
  const reqAuth = to.matched.some(record => record.meta.requiresAuth);
  const reqAdmin = to.matched.some(record => record.meta.admin);
  if (reqAdmin && !isAdmin) {
    next({ name: 'NotFound', params: { 0: to.fullPath } });
    return;
  }
  if (reqAuth && !loginStatus) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
    return;
  }
  next();
});

export default router;
