<template>
  <section class="section">
    <div class="container">
      <contest-config></contest-config>
    </div>
  </section>
</template>

<script>
import ContestConfig from './ContestConfig';

export default {
  name: 'NewContest',
  components: {
    ContestConfig,
  },
};
</script>
