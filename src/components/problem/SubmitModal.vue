<template>
  <Modal title="提出" :isActive="isActive" @close="$emit('close')">
    <SourceCodeInput
      :value="value"
      :title="problem.title"
      @input="updateValue"
    />
    <button class="button is-link" @click="$emit('submit')">
      提出
    </button>
  </Modal>
</template>
<script>
import Modal from '@/components/common/Modal';
import SourceCodeInput from '@/components/common/SourceCodeInput';

export default {
  data() {
    return {
      value: {
        languageID: 1,
        sourceCode: '',
      },
    };
  },
  props: [
    'isActive',
    'problem',
  ],
  methods: {
    updateValue(newValue) {
      this.value = newValue;
    },
  },
  components: {
    Modal,
    SourceCodeInput,
  },
};
</script>
