<template>
  <Modal title="提出" :isActive="isActive" @close="$emit('close')">
    <SourceCodeInput value="{languageID: 1, sourceCode: ''}" :title="problemTitle"></SourceCodeInput>
    <button class="button is-link" @click="$emit('submit')">
      提出
    </button>
  </Modal>
</template>
<script>
import Modal from '@/components/common/Modal';
import SourceCodeInput from '@/components/common/SourceCodeInput';

export default {
  props: [
    'isActive',
    'problemTitle',
  ],
  components: {
    Modal,
    SourceCodeInput,
  }
}
</script>
