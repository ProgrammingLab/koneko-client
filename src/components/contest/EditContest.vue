<template>
  <section class="section">
    <div class="container">
      <div class="notification is-info" :hidden="this.message === null">
        {{ this.message }}
      </div>
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
  name: 'EditContest',
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
      error: null,
      sending: false,
      message: null,
    };
  },
  computed: {
    ...mapState('koneko', [
      'sessionID',
    ]),
  },
  async created() {
    try {
      this.contest = (await api.getContest(this.sessionID, this.$route.params.id)).data;
      this.error = null;
    } catch (e) {
      this.error = e;
      if (e.response && e.response.status === 404) {
        this.$router.push('/404');
      }
    }
  },
  methods: {
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
