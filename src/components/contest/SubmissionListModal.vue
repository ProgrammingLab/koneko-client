<template>
  <Modal
    :isActive="isActive"
    isWide title="提出一覧"
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
        
      </tbody>
    </table>
  </Modal>
</template>

<script>
import Modal from '@/components/common/Modal';
import Tag from './Tag';

export default {
  props: [
    'isActive',
  ],
  components: {
    Modal,
    Tag,
  },
};
</script>
