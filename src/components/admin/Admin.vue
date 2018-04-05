<template>
  <div class="columns">
    <worker-dashboard class="column"></worker-dashboard>
  </div>
</template>

<script>
import WorkerDashboard from './WorkerDashboard';

export default {
  name: 'Admin',
  components: { WorkerDashboard },
};
</script>
