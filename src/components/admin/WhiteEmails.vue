<template>
  <section class="section">
    <h1 class="title">
      ホワイトリスト
    </h1>
    <table class="table is-striped is-hoverable">
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
          <td><a class="delete"></a></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'WhiteEmails',
  created() {
    this.fetchWhiteEmails({ sessionID: this.sessionID });
  },
  computed: {
    ...mapState('auth', ['sessionID']),
    ...mapState('whiteEmails', ['whiteEmails']),
  },
  methods: {
    ...mapActions('whiteEmails', ['fetchWhiteEmails']),
  },
};
</script>
