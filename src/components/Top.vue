<template lang="html">
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Koneko Online Judge
          </h1>
        </div>
      </div>
    </section>
    <div class="container">
      <section class="section">
        <div>
          <h2 class="subtitle">
            開催中のコンテスト
          </h2>
          <contest-list :contests="activeContests"/>
        </div>
      </section>
      <section class="section">
        <div>
          <h2 class="subtitle">
            予定されたコンテスト
          </h2>
          <contest-list :contests="upcomingContests"/>
        </div>
      </section>
      <section class="section">
        <div>
          <h2 class="subtitle">
            終了したコンテスト(5件)
          </h2>
          <contest-list :contests="recentContests"/>
        </div>
        <router-link to="/contests">すべてのコンテストを表示</router-link>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ContestList from './contest/ContestList';

export default {
  name: 'Top',
  components: {
    ContestList,
  },
  created() {
    this.fetchAllContests();
  },
  computed: {
    ...mapGetters('koneko/contestList', [
      'activeContests',
      'upcomingContests',
      'recentContests',
    ]),
  },
  methods: {
    ...mapActions('koneko/contestList', ['fetchAllContests']),
  },
};
</script>

<style lang="css">
</style>
