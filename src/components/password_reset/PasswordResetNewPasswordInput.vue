<template>
  <div>
    <form v-on:submit.prevent="onSubmit" v-show="verified">
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
    <div class="notification is-danger" v-show="!this.verified && !this.verifying">
      パスワードリセットリンクが無効です。
      <router-link to="/password_reset">最初からやり直す</router-link>
    </div>
    <error-notification :error="error"/>
  </div>
</template>

<script>
import api from '@/api';
import NewPasswordInput from '../common/NewPasswordInput';
import ErrorNotification from '../common/ErrorNotification';

export default {
  name: 'PasswordResetNewPasswordInput',
  components: {
    NewPasswordInput,
    ErrorNotification,
  },
  props: [
    'token',
  ],
  data() {
    return {
      password: null,
      error: null,
      sending: false,
      verifying: true,
      verified: false,
    };
  },
  async created() {
    try {
      await api.verifyPasswordResetToken(this.token);
      this.verified = true;
    } catch (e) {
      if (!e.response || e.response.status !== 404) {
        this.error = e;
      }
    } finally {
      this.verifying = false;
    }
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
