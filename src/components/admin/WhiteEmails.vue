<template>
  <section class="section">
    <h1 class="title">
      ホワイトリスト
    </h1>
    <table class="table is-striped is-hoverable is-fullwidth">
      <thead>
        <th>ID</th>
        <th>Email</th>
        <th>Added by</th>
        <th>Added at</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="email in this.whiteEmails" :key="email.id">
          <th>{{ email.id }}</th>
          <td>{{ email.email }}</td>
          <td>{{ email.createdBy.name }}</td>
          <td>{{ email.createdAt }}</td>
          <td>
            <button class="delete" @click="onDelete(email)" :disabled="sending"></button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="column is-4">
      <p class="notification is-danger" :hidden="errorMessage === null">{{ errorMessage }}</p>
      <form v-on:submit.prevent="onAdd">
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input" required type="email" placeholder="Email" v-model="email">
          </div>
          <div class="control">
            <button class="button is-primary" :class="{ 'is-loading': sending }" type="submit">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'WhiteEmails',
  data() {
    return {
      email: null,
      sending: false,
    };
  },
  created() {
    this.fetchWhiteEmails();
  },
  computed: {
    ...mapState('koneko/whiteEmails', [
      'whiteEmails',
      'error',
    ]),
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
  methods: {
    ...mapActions('koneko/whiteEmails', [
      'fetchWhiteEmails',
      'addWhiteEmail',
      'deleteWhiteEmail',
    ]),
    async onAdd() {
      if (this.sending) {
        return false;
      }
      this.sending = true;
      await this.addWhiteEmail({ email: this.email });
      this.email = '';
      if (this.error) {
        this.sending = false;
        return false;
      }
      await this.fetchWhiteEmails();
      this.sending = false;
      return true;
    },
    async onDelete(email) {
      this.sending = true;
      await this.deleteWhiteEmail({ id: email.id });
      await this.fetchWhiteEmails();
      this.sending = false;
    },
  },
};
</script>
