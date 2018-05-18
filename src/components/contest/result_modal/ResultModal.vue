<template>
  <Modal
    :isActive="isActive"
    isWide
    title="提出一覧"
    @close="$emit('close')"
  >
    <List v-if="isList" @showDetail="showDetail"/>
    <Detail v-else />
  </Modal>
</template>

<script>
import { mapActions } from 'vuex';
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
    showDetail(id) {
      this.getDetail(id);
      this.isList = false;
    },
  },
  components: {
    List,
    Detail,
    Modal,
  },
};
</script>
