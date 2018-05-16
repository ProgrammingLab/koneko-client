<template>
  <div class="container">
    <section class="section">
      <h1 class="title">コンテスト一覧</h1>
      <contest-list :contests="contests"/>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ContestList from './ContestList';

export default {
  name: 'ContestTop',
  components: {
    ContestList,
  },
  computed: {
    ...mapState('koneko/contestList', [
      'contests',
      'error',
    ]),
  },
  created() {
    this.fetchAllContests();
  },
  methods: {
    ...mapActions('koneko/contestList', ['fetchAllContests']),
  },
};
</script>
