<template>
  <div>
    <nav class="level" id="navi">
      <div class="level-left">
        <div class="level-item">
          <div class="field">
            <label class="label">表示件数</label>
            <div class="control">
              <div class="select">
                <select v-model="pageLimit" @change="getResults">
                  <option>25</option>
                  <option>50</option>
                  <option>75</option>
                  <option>100</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="level-item">
          <div class="field">
            <label class="label">ユーザー検索</label>
            <div class="control">
              <div class="select">
                <select v-model="userFilter" @change="getResults">
                  <option :value="undefined">
                    全て
                  </option>
                  <option
                    v-for="writer in writers"
                    :value="writer.id"
                    :key="writer.id"
                  >
                    {{writer.displayName}}(作問者)
                  </option>
                  <option
                    v-for="participant in participants"
                    :value="participant.id"
                    :key="participant.id"
                  >
                    {{participant.displayName}}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="level-item">
          <div class="field">
            <label class="label">問題検索</label>
            <div class="control">
              <div class="select">
                <select v-model="problemFilter" @change="getResults">
                  <option :value="undefined">
                    全て
                  </option>
                  <option
                    v-for="problem in problems"
                    :value="problem.id"
                    :key="problem.id"
                  >
                    {{problem.title}}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="field">
            <div class="control">
              <button class="button" @click="getResults">
                更新
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <table class="table is-fullwidth fixed-table">
      <thead>
        <tr>
          <th>提出日時</th>
          <th>問題</th>
          <th>ユーザー</th>
          <th>言語</th>
          <th>得点</th>
          <th>コード長</th>
          <th>結果</th>
          <th>実行時間</th>
          <th>メモリ</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(submission, index) in results" :key="index">
          <td>{{formatDate(submission.createdAt)}}</td>
          <td>{{submission.problem.title}}</td>
          <td>{{submission.user.displayName}}</td>
          <td>{{submission.language.displayName}}</td>
          <td>{{submission.point}}</td>
          <td>{{`${submission.codeBytes} Byte`}}</td>
          <td><Tag :status="submission.status" /></td>
          <td>{{`${submission.execTime / 1000000} ms`}}</td>
          <td>{{`${submission.memoryUsage} KB`}}</td>
          <td>
            <button class="button is-info" @click="$emit('showDetail',submission.id)">
              詳細
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pager @movePage="movePage" :length="pageLength" :current="currentPage" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import Pager from '@/components/common/Pager';
import Tag from '../Tag';

export default {
  computed: {
    ...mapState('koneko/contests/results', [
      'results',
      'resultLength',
    ]),
    ...mapState('koneko/contests', [
      'problems',
      'participants',
      'writers',
    ]),
    ...mapGetters('koneko/contests/results', [
      'pageLength',
    ]),
    currentPage: {
      set(val) {
        this.$store.commit(
          'koneko/contests/results/setCurrentPage',
          val,
        );
      },
      get() {
        return this.$store.state
        .koneko.contests.results.currentPage;
      }
    },
    pageLimit: {
      set(val) {
        this.$store.commit(
          'koneko/contests/results/setPageLimit',
          val,
        );
      },
      get() {
        return this.$store.state
        .koneko.contests.results.pageLimit;
      },
    },
    userFilter: {
      set(val) {
        this.$store.commit(
          'koneko/contests/results/setUserFilter',
          val,
        );
      },
      get() {
        return this.$store.state
        .koneko.contests.results.userFilter;
      },
    },
    problemFilter: {
      set(val) {
        this.$store.commit(
          'koneko/contests/results/setProblemFilter',
          val,
        );
      },
      get() {
        return this.$store.state
        .koneko.contests.results.problemFilter;
      },
    },
  },
  methods: {
    ...mapActions('koneko/contests/results', [
      'getResults',
    ]),
    // contest.vueでも使ってるからmixinとか使って使いまわしたい,
    // 今はどういう感じにするか悩んだのでコピペでとりあえず書いておく
    formatDate(date, format) {
      return moment(date)
        .locale('ja')
        .format(format || 'YYYY/MM/DD(ddd) HH:mm')
      ;
    },
    movePage(page) {
      this.currentPage = page;
      this.getResults();
      document.getElementById('navi').scrollIntoView(true);
    },

  },
  components: {
    Tag,
    Pager,
  },
};
</script>

<style lang="css">
</style>
