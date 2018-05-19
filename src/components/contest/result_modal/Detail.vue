<template>
  <div>
    <h3 class="title">提出ID({{detail.id}})</h3>
    <section class="section">
      <div class="container">
        <h4 class="title is-5">ソースコード</h4>
        <pre v-highlightjs="detail.sourceCode"><code class="cpp"></code></pre>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <h4 class="title is-5">結果</h4>
        <table class="table is-fullwidth is-bordered fixed-table">
          <tr>
            <th>提出日時</th>
            <td>{{formatDate(detail.createdAt)}}</td>
          </tr>
          <tr>
            <th>問題</th>
            <td>{{detail.problem.title}}</td>
          </tr>
          <tr>
            <th>ユーザー</th>
            <td>{{detail.user.displayName}}</td>
          </tr>
          <tr>
            <th>言語</th>
            <td>{{detail.language.displayName}}</td>
          </tr>
          <tr>
            <th>得点</th>
            <td>{{detail.point}}</td>
          </tr>
          <tr>
            <th>コード長</th>
            <td>{{`${detail.codeBytes} Byte`}}</td>
          </tr>
          <tr>
            <th>結果</th>
            <td><Tag :status="detail.status"/></td>
          </tr>
          <tr>
            <th>実行時間</th>
            <td>{{`${detail.execTime / 1000000} ms`}}</td>
          </tr>
          <tr>
            <th>メモリ</th>
            <td>{{`${detail.memoryUsage} KB`}}</td>
          </tr>
        </table>
      </div>
    </section>
    <section class="section">
      <div>
        <h4 class="title is-5">テストケース</h4>
        <table class="table is-fullwidth is-bordered">
          <tr>
            <th colspan="3">セット</th>
            <th colspan="4">ケース</th>
          </tr>
          <tr>
            <th>インデックス</th>
            <th>結果</th>
            <th>ポイント</th>
            <th>インデックス</th>
            <th>結果</th>
            <th>実行時間</th>
            <th>メモリ</th>
          </tr>
          <template v-for="(caseSet, i) in detail.judgeSetResults">
            <tr v-for="(caseData, j) in caseSet.judgeResults" :key="`${i}-${j}`">
              <template v-if="j == 0">
                <td :rowspan="setData.judgeResults.length">
                  {{i}}
                </td>
                <td :rowspan="caseSet.judgeResults.length">
                  <Tag :status="caseSet.status"/>
                </td>
                <td :rowspan="caseSet.judgeResults.length">
                  {{caseSet.point}}
                </td>
              </template>
              <td>{{j}}</td>
              <td><Tag :status="caseData.status"/></td>
              <td>{{`${caseData.execTime / 1000000} ms`}}</td>
              <td>{{`${caseData.memoryUsage} KB`}}</td>
            </tr>
          </template>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import Tag from '../Tag';

export default {
  computed: {
    ...mapState('koneko/contests/results/detail', [
      'detail',
    ]),
  },
  components: {
    Tag,
  },
  methods: {
    formatDate(date, format) {
      return moment(date)
        .locale('ja')
        .format(format || 'YYYY/MM/DD(ddd) HH:mm')
      ;
    },
  },
};
</script>

<style lang="css">
</style>
