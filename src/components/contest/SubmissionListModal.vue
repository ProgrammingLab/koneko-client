<template>
  <Modal
    :isActive="isActive"
    isWide
    title="提出一覧"
    @close="$emit('close')"
  >
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
          <td>{{submission.createdAt}}</td>
          <td>{{submission.problem.title}}</td>
          <td>{{submission.user.displayName}}</td>
          <td>{{submission.language.displayName}}</td>
          <td>{{submission.point}}</td>
          <td>{{submission.codeBytes}}</td>
          <td><Tag :status="submission.status" /></td>
          <td>{{submission.execTime}}</td>
          <td>{{submission.memoryUsage}}</td>
          <td>{{submission.id}}</td>
        </tr>
      </tbody>
    </table>
  </Modal>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Modal from '@/components/common/Modal';
import Tag from './Tag';

export default {
  computed: {
    ...mapState('koneko/contests/submissions', [
      'submissions',
      'pageLimit',
      'submissionLength',
    ]),
    ...mapGetters('koneko/contets/submissions', [
      'pageLength',
    ]),
  },
  props: [
    'isActive',
  ],
  components: {
    Modal,
    Tag,
  },
};
</script>
