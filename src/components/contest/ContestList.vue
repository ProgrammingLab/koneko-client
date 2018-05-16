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
          <th>
            <router-link :to="'/contests/' + contest.id">
              {{ contest.title }}
            </router-link>
          </th>
          <td>
            {{ contest.startAt | time }}
          </td>
          <td>
            {{ contest.endAt | time }}
          </td>
          <td>
            {{ contestStatusMap.get(contest.id) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  name: 'ContestList',
  props: [
    'contests',
  ],
  computed: {
    ...mapGetters('koneko/timeDiff', ['serverTime']),
    contestStatusMap() {
      if (this.contests) {
        return new Map(this.contests.map((c) => {
          let status = '予定';
          if (this.serverTime.isSameOrAfter(c.endAt)) {
            status = '終了';
          } else if (this.serverTime.isSameOrAfter(c.startAt)) {
            status = '開催中';
          }
          return [c.id, status];
        }));
      }
      return null;
    },
  },
  filters: {
    time(value) {
      return moment(value).format('YYYY年M月D日 HH:mm');
    },
  },
};
</script>
