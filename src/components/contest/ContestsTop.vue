<template>
  <div class="container">
    <section class="section">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title">
              すべてのコンテスト
            </h1>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="field">
              <div class="control">
                <router-link class="button is-success" to="/contests/new">
                  新しいコンテストを追加
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
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
