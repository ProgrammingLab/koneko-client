<template>
  <Modal
    :isActive="isActive"
    isWide
    title="提出一覧"
    @close="$emit('close')"
  >
    <nav class="level" id="navi">
      <div class="level-left">
        <div class="level-item">
          <div class="field">
            <label class="label">表示件数</label>
            <p class="control">
              <div class="select">
                <select v-model.number="pageLimit">
                  <option>25</option>
                  <option>50</option>
                  <option>75</option>
                  <option>100</option>
                </select>
              </div>
            </p>
          </div>
        </div>
        <div class="level-item">
          <div class="field">
            <label class="label">ユーザー検索</label>
            <p class="control">
              <div class="select">
                <select>
                  <option>未実装</option>
                </select>
              </div>
            </p>
          </div>
        </div>
        <div class="level-item">
          <div class="field">
            <label class="label">問題検索</label>
            <p class="control">
              <div class="select">
                <select>
                  <option>未実装</option>
                </select>
              </div>
            </p>
          </div>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="field">
            <p class="control">
              <button　class="button" @click="updateSubmissionTable">
                更新
              </button>
            </p>
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
          <th>提出ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(submission, index) in submissions" :key="index">
          <td>{{formatDate(submission.createdAt)}}</td>
          <td>{{submission.problem.title}}</td>
          <td>{{submission.user.displayName}}</td>
          <td>{{submission.language.displayName}}</td>
          <td>{{submission.point}}</td>
          <td>{{`${submission.codeBytes} Byte`}}</td>
          <td><Tag :status="submission.status" /></td>
          <td>{{`${submission.execTime / 1000000} ms`}}</td>
          <td>{{`${submission.memoryUsage} KB`}}</td>
          <td>{{submission.id}}</td>
        </tr>
      </tbody>
    </table>
    <Pager @movePage="movePage" :length="pageLength" :current="currentPage"></Pager>
  </Modal>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import Modal from '@/components/common/Modal';
import Pager from '@/components/common/Pager';
import Tag from './Tag';


export default {
  data() {
    return {
      pageLimit: 25,
    };
  },
  props: [
    'isActive',
  ],
  computed: {
    ...mapState('koneko/contests/submissions', [
      'submissions',
      'submissionLength',
      'currentPage',
    ]),
    ...mapGetters('koneko/contests/submissions', [
      'pageLength',
    ]),
  },
  methods: {
    ...mapActions('koneko/contests/submissions', [
      'getSubmissions',
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
      const limit = this.pageLimit;
      this.getSubmissions({ page, limit });
      document.getElementById('navi').scrollIntoView(true);
    },
    updateSubmissionTable(){
      const limit = this.pageLimit;
      this.getSubmissions({ limit });
    }
  },
  components: {
    Modal,
    Tag,
    Pager,
  },
};
</script>
