<template>
  <section class="section">
    <div class="container">
      <contest-config v-on:submited="submited"/>
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
  methods: {
    submited(contest) {
      this.$router.push(`/contests/${contest.id}`);
    },
  },
};
</script>
