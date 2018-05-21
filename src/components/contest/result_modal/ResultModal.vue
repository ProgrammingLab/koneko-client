<template>
  <Modal
    :isActive="isActive"
    isWide
    title="提出一覧"
    @close="close"
  >
    <List v-if="isList" @showDetail="showDetail"/>
    <template v-else >
      <Detail />
      <a slot="footer" class="button" @click="isList = true">
       <span class="icon">
         <i class="fas fa-arrow-circle-left"></i>
       </span>
       <span>一覧に戻る</span>
     </a>
    </template>
  </Modal>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import Modal from '@/components/common/Modal';
import List from './List';
import Detail from './Detail';

export default {
  data() {
    return {
      isList: true,
    };
  },
  props: [
    'isActive',
  ],
  methods: {
    ...mapActions('koneko/contests/results/detail', [
      'getDetail',
    ]),
    ...mapMutations('koneko/contests/results/detail', [
      'setSubmissionID',
    ]),
    async showDetail(id) {
      this.setSubmissionID(id);
      await this.getDetail();
      this.isList = false;
    },
    close() {
      this.isList = true;
      this.$emit('close');
    },
  },
  components: {
    List,
    Detail,
    Modal,
  },
};
</script>
