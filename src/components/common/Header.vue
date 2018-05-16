<template>
  <nav
    class="navbar is-white has-shadow is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand navbar-start">
        <router-link class="navbar-item brand-text" to="/">
          Koneko
        </router-link>
      </div>
      <div class="navbar-end">
        <div id="navMenu" class="navbar-menu">
          <div class="navbar-start">
            <router-link class="navbar-item" to="/contests">
              Contests
            </router-link>
            <router-link class="navbar-item" to="#">
              Problems
            </router-link>
            <div
              class="navbar-item has-dropdown is-right is-hoverable"
              v-if="id"
              >
              <a
                class="navbar-link"
                aria-haspopup="true"
                aria-controls="dropdown-menu4"
                >
                <div class="columns">
                  <span class="column icon is-small">
                    <i class="fas fa-user" aria-hidden="true"></i>
                  </span>
                  <span class="column">{{ this.name }}</span>
                </div>
              </a>
              <div class="navbar-dropdown is-boxed">
                <a class="navbar-item" @click="onLogout">
                  <p>ログアウト</p>
                </a>
              </div>
            </div>
            <router-link v-else class="navbar-item" to="/login">
              <div class="columns">
                <span class="column icon">
                  <i class="fas fa-sign-in-alt" aria-hidden="true"></i>
                </span>
                <span class="column is-11">ログイン</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState('koneko/user', [
      'id',
      'name',
    ]),
  },
  methods: {
    ...mapActions('koneko', [
      'logout',
      'updateLoginStatus',
    ]),
    async onLogout() {
      await this.logout();
      await this.updateLoginStatus();
      this.$router.push('/');
    },
  },
};
</script>
