<template>
  <form v-on:submit.prevent="onSubmit">
    <new-password-input v-model="password"/>
    <div class="field">
      <button
        class="button is-info is-fullwidth"
        :class="{ 'is-loading': sending }"
        :disabled="!this.password"
        >
        パスワードをリセット
      </button>
    </div>
  </form>
</template>

<script>
import api from '@/api';
import NewPasswordInput from '../common/NewPasswordInput';

export default {
  name: 'PasswordResetNewPasswordInput',
  components: {
    NewPasswordInput,
  },
  props: [
    'token',
  ],
  data() {
    return {
      password: null,
      error: null,
      sending: false,
    };
  },
  methods: {
    async onSubmit() {
      this.sending = true;
      try {
        await api.resetPassword(this.password, this.token);
        this.error = null;
        this.$router.push('/login');
      } catch (e) {
        this.error = e;
      } finally {
        this.sending = false;
      }
    },
  },
};
</script>
