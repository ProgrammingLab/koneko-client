<template>
  <form v-on:submit.prevent="onSubmit">
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input required class="input" type="text" placeholder="Title" v-model="contest.title">
      </div>
    </div>
      <div class="field">
        <label class="label">Time</label>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field is-grouped">
              <div class="control">
                <date-time-input
                  required="true"
                  placeholder="Starts at"
                  v-model="contest.startAt"
                />
              </div>
              <div class="control">
                〜
              </div>
              <div class="control">
                <date-time-input
                  required="true"
                  placeholder="Ends at"
                  v-model="contest.endAt"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Description"
            rows="10"
            v-model="contest.description"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Writers</label>
          <table class="table is-striped is-hoverable">
            <thead>
              <th>ID</th>
              <th>Name</th>
              <th></th>
            </thead>
            <tbody>
              <tr v-for="(user, index) in this.contest.writers" :key="user.id">
                <th>{{ user.id }}</th>
                <th>{{ user.name }}</th>
                <td>
                  <a class="delete" @click="onDelete(index)" :disabled="sending"></a>
                </td>
              </tr>
            </tbody>
          </table>
        <div class="field has-addons">
          <div class="control">
            <div class="select">
              <select v-model="selected">
                <option v-for="(user, index) in this.users" :key="user.id" :value="index">
                  {{ user.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="control">
            <a class="button" @click="onAdd" :disabled="selected === null">Add</a>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button type="submit" class="button is-link" :disabled="sending">Submit</button>
        </div>
      </div>
      <div>
        <p class="notification is-danger" :hidden="errorMessage === null">{{ errorMessage }}</p>
      </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import DateTimeInput from '../common/DateTimeInput';

export default {
  name: 'ContestConfig',
  components: {
    DateTimeInput,
  },
  data() {
    return {
      selected: null,
      error: null,
    };
  },
  props: [
    'contest',
    'sending',
  ],
  computed: {
    ...mapState('koneko/users', [
      'users',
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
  async created() {
    await this.fetchUsers();
  },
  methods: {
    ...mapActions('koneko/users', [
      'fetchUsers',
    ]),
    onAdd() {
      if (this.selected !== null) {
        const user = this.users[this.selected];
        const found = this.contest.writers.find(v => v.id === user.id);
        if (found !== undefined) {
          return;
        }
        this.contest.writers.push(user);
      }
    },
    onDelete(index) {
      this.$delete(this.contest.writers, index);
    },
    async onSubmit() {
      this.$emit('onSubmit', this.contest);
    },
  },
};
</script>
