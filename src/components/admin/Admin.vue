<template>
  <div>
    <white-emails></white-emails>
    <worker-dashboard></worker-dashboard>
  </div>
</template>

<script>
import WorkerDashboard from './WorkerDashboard';
import WhiteEmails from './WhiteEmails';

export default {
  name: 'Admin',
  components: {
    WorkerDashboard,
    WhiteEmails,
  },
};
</script>
