<template>
  <div>
    <nav class="level" id="navi">
      <div class="level-left">
        <div class="level-item">
          <div class="field">
            <label class="label">表示件数</label>
            <div class="control">
              <div class="select">
                <select v-model.number="pageLimit">
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
                <select>
                  <option>未実装</option>
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
                <select>
                  <option>未実装</option>
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
              <button class="button" @click="updateResultTable">
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
    <Pager @movePage="movePage" :length="pageLength" :current="currentPage"></Pager>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import Pager from '@/components/common/Pager';
import Tag from '../Tag';

export default {
  data() {
    return {
      pageLimit: 25,
    };
  },
  computed: {
    ...mapState('koneko/contests/results', [
      'results',
      'resultLength',
      'currentPage',
    ]),
    ...mapGetters('koneko/contests/results', [
      'pageLength',
    ]),
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
      this.getResults({ page });
      document.getElementById('navi').scrollIntoView(true);
    },
    updateResultTable() {
      const limit = this.pageLimit;
      this.getResults({ limit, page: 1 });
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
