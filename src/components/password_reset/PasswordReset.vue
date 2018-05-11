<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">パスワードリセット</h1>
        <div class="box column is-4 is-offset-4">
          <password-reset-new-password-input v-if="resetToken" :token="resetToken"/>
          <password-reset-email-input v-else/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PasswordResetEmailInput from './PasswordResetEmailInput';
import PasswordResetNewPasswordInput from './PasswordResetNewPasswordInput';

export default {
  name: 'PasswordReset',
  components: {
    PasswordResetEmailInput,
    PasswordResetNewPasswordInput,
  },
  computed: {
    resetToken() {
      return this.$route.params.token || null;
    },
  },
};
</script>
