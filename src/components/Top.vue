<template lang="html">
  <div>
    <router-link to="/admin">Go to Foo</router-link>
    <div class="container">
      problem id:<input v-model='problemID'/>
      <error-notification :error="error"/>
      <problem :problem="problem"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/api';
import Markdown from './common/Markdown';
import Problem from './problem/Problem';
import ErrorNotification from './common/ErrorNotification';

export default {
  components: {
    Markdown,
    Problem,
    ErrorNotification,
  },
  data() {
    return {
      problemID: null,
      problem: null,
      error: null,
    };
  },
  created() {
    this.problemID = 11;
  },
  computed: {
    ...mapState('koneko', [
      'sessionID',
    ]),
  },
  watch: {
    async problemID(val) {
      try {
        this.problem = (await api.getProblem(this.sessionID, val)).data;
        this.error = null;
      } catch (e) {
        this.error = e;
      }
    },
  },
};
</script>

<style lang="css">
</style>
