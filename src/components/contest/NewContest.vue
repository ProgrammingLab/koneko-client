<template>
  <section class="section">
    <div class="container">
      <div>
        <error-notification :error="error"/>
      </div>
      <div>
        <contest-config :contest="contest" :sending="sending" v-on:onSubmit="onSubmit"/>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/api';
import ContestConfig from './ContestConfig';
import ErrorNotification from '../common/ErrorNotification';

export default {
  name: 'NewContest',
  components: {
    ContestConfig,
    ErrorNotification,
  },
  data() {
    const contest = {
      title: null,
      description: '',
      startAt: null,
      endAt: null,
      writers: [],
    };
    return {
      contest,
      sending: false,
      error: null,
    };
  },
  computed: {
    ...mapState('koneko', [
      'sessionID',
    ]),
  },
  methods: {
    async onSubmit() {
      this.sending = true;
      try {
        const res = await api.createContest(this.sessionID, this.contest);
        this.error = null;
        this.contest = res.data;
        this.$router.push(`/contests/${this.contest.id}`);
      } catch (e) {
        this.error = e;
      } finally {
        this.sending = false;
      }
    },
  },
};
</script>
