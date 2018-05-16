<template>
  <div>
    <table v-if="contests !== null" class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>コンテスト名</th>
          <th>開始時刻</th>
          <th>終了時刻</th>
          <th>ステータス</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contest in contests" :key="contest.id">
          <th>{{ contest.title }}</th>
          <td>{{ contest.startAt }}</td>
          <td>{{ contest.endAt }}</td>
          <td>TODO</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ContestList',
  props: [
    'contests',
  ],
  computed: {
    ...mapGetters('koneko/timeDiff', ['serverTime']),
    contestMap() {
      if (this.contests) {
        return new Map(this.contests.map(v => [v.id, this.serverTime.isBetween(v.startAt, v.EndAt)]));
      }
      return null;
    },
  },
};
</script>
