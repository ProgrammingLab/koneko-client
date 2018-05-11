import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Admin from '@/components/admin/Admin';
import Top from '@/components/Top';
import NewContest from '@/components/contest/NewContest';
import Contest from '@/components/contest/Contest';
import EditContest from '@/components/contest/EditContest';
import EditProblem from '@/components/problem/EditProblem';
import PasswordReset from '@/components/password_reset/PasswordReset';
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
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: { requiresAuth: true, admin: true },
    },
    {
      path: '/contests/new',
      name: 'NewContest',
      component: NewContest,
      meta: { requiresAuth: true, admin: false },
    },
    {
      path: '/contests/:id',
      name: 'Contest',
      component: Contest,
      meta: { requiresAuth: true },
    },
    {
      path: '/contests/:id/edit',
      name: 'EditContest',
      component: EditContest,
      meta: { requiresAuth: true, admin: false },
    },
    {
      path: '/problems/:id/edit',
      name: 'EditProblem',
      component: EditProblem,
      meta: { requiresAuth: true, admin: false },
    },
    {
      path: '/password_reset/:token?',
      name: 'PasswordReset',
      component: PasswordReset,
      meta: { requiresAuth: false, admin: false },
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
