<template>
  <div>
    <div v-if="sended">
      <label class="label">
        {{ email }}にパスワードリセットリンクを送信しました。
      </label>
    </div>
    <form v-else v-on:submit.prevent="onSubmit">
      <div class="field">
        <label class="label">
          メールアドレスを入力してください。
          パスワードリセットリンクを送信します。
        </label>
        <input
          class="input"
          type="email"
          placeholder="メールアドレスを入力"
          required
          v-model="email"
          />
      </div>
      <div class="field">
        <button class="button is-info is-fullwidth" :class="{ 'is-loading': sending }">
          パスワードリセットリンクを送信
        </button>
      </div>
      <div class="field">
        <error-notification :error="error"/>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/api';
import ErrorNotification from '../common/ErrorNotification';

export default {
  name: 'PasswordResetEmailInput',
  components: {
    ErrorNotification,
  },
  data() {
    return {
      email: null,
      sending: false,
      sended: false,
      error: null,
    };
  },
  computed: {
    ...mapState('koneko', ['sessionID']),
  },
  methods: {
    async onSubmit() {
      this.sending = true;
      try {
        await api.sendPasswordResetMail(this.email);
        this.error = null;
        this.sended = true;
      } catch (e) {
        this.error = e;
      } finally {
        this.sending = false;
      }
    },
  },
};
</script>
