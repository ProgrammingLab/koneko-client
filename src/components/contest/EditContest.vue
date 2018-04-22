<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Contest settings
        <router-link to="../7/edit">hoge</router-link>
      </h1>
      <div class="tabs">
          <ul>
            <li :class="{ 'is-active': activeTab === 'config' }">
              <router-link to="./edit#config">
                Config
              </router-link>
            </li>
            <li :class="{ 'is-active': activeTab === 'problems' }">
              <router-link to="./edit#problems">
                Problems
              </router-link>
            </li>
          </ul>
      </div>
      <div class="notification is-info" :hidden="this.message === null">
        {{ this.message }}
      </div>
      <div>
        <error-notification :error="error"/>
      </div>
      <div :hidden="activeTab !== 'config'">
        <contest-config :contest="contest" :sending="sending" v-on:onSubmit="onSubmit"/>
      </div>
      <div :hidden="activeTab !== 'problems'">
        <contest-problems-config :contest="contest"/>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/api';
import ContestConfig from './ContestConfig';
import ContestProblemsConfig from './ContestProblemsConfig';
import ErrorNotification from '../common/ErrorNotification';

export default {
  name: 'EditContest',
  components: {
    ContestConfig,
    ErrorNotification,
    ContestProblemsConfig,
  },
  data() {
    const contest = {
      title: null,
      description: '',
      startAt: null,
      endAt: null,
      writers: [],
      problems: [],
    };
    return {
      contest,
      error: null,
      sending: false,
      message: null,
    };
  },
  computed: {
    ...mapState('koneko', [
      'sessionID',
    ]),
    activeTab() {
      const tab = this.$route.hash;
      if (tab) {
        return tab.substring(1);
      }
      return 'config';
    },
  },
  async created() {
    await this.onUpdate(this.$route.params.id);
  },
  async beforeRouteUpdate(to, from, next) {
    if (to.params.id !== from.params.id) {
      await this.onUpdate(to.params.id);
    }
    next();
  },
  methods: {
    async onUpdate(contestID) {
      try {
        this.contest = (await api.getContest(this.sessionID, contestID)).data;
        this.error = null;
      } catch (e) {
        this.error = e;
        if (e.response && e.response.status === 404) {
          this.$router.push('/404');
        }
      }
    },
    async onSubmit() {
      this.sending = true;
      this.message = null;
      try {
        await api.updateContest(this.sessionID, this.contest);
        this.error = null;
        this.message = '保存しました';
      } catch (e) {
        this.error = e;
      } finally {
        this.sending = false;
      }
    },
  },
};
</script>
