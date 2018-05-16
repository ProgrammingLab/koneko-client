<template>
  <Modal title="提出" :isActive="isActive" @close="close">
    <SourceCodeInput
      :value="value"
      :title="problem.title"
      @input="updateValue"
    />
    <button slot="footer" class="button is-link" @click="submit">
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
    close() {
      this.value.sourceCode = '';
      this.$emit('close');
    },
    submit() {
      const val = Object.assign({}, this.value);
      this.$emit('submit', val);
      this.close();
    },
  },
  components: {
    Modal,
    SourceCodeInput,
  },
};
</script>
