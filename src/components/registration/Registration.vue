<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">ユーザー登録</h1>
        <div class="box column is-4 is-offset-4">
          <div v-if="!verifying && !verified" class="notification is-danger">
            招待リンクが無効です。
          </div>
          <form v-else v-on:submit.prevent="onSubmit">
            <div class="field">
              <user-config v-model="user" @validated="onValidated"/>
            </div>
            <div class="field">
              <button class="button" :disabled="!isValidUserDate">
                登録
              </button>
            </div>
          </form>
          <error-notification :error="error"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/api';
import ErrorNotification from '../common/ErrorNotification';
import UserConfig from '../user/UserConfig';

export default {
  name: 'Registration',
  components: {
    ErrorNotification,
    UserConfig,
  },
  data() {
    return {
      user: {
        displayName: null,
        name: null,
        password: null,
      },
      verifying: true,
      verified: false,
      isValidUserDate: false,
      error: null,
    };
  },
  async created() {
    this.verifying = true;
    try {
      await api.verifyEmailConfirmationToken(this.$route.params.token);
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
    onValidated(isValid) {
      this.isValidUserDate = isValid;
    },
  },
};
</script>
