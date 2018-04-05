<template>
  <p>{{ this.workers }}</p>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'WorkerDashboard',
  created() {
    this.getWorkers({ sessionID: this.sessionID });
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
