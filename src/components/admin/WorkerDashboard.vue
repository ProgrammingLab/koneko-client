<template>
  <p>{{ this.workers }}</p>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'WorkerDashboard',
  mounted() {
    // eslint-disable-next-line no-console
    console.error('hoge');
    this.getWorkers(this.sessionID);
  },
  computed: {
    ...mapState('auth', ['sessionID']),
    ...mapState('dashboard', ['workers']),
  },
  methods: {
    ...mapActions('dashboard', ['getWorkers']),
  },
};
</script>
