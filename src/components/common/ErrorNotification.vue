<template>
  <p class="notification is-danger" :hidden="errorMessage === null">{{ errorMessage }}</p>
</template>

<script>
export default {
  name: 'ErrorNotification',
  props: [
    'error',
  ],
  computed: {
    errorMessage() {
      if (this.error) {
        if (this.error.response) {
          return `${this.error.response.data.message}(${this.error.response.status})`;
        }
        return 'サーバーに接続できません';
      }
      return null;
    },
  },
};
</script>
