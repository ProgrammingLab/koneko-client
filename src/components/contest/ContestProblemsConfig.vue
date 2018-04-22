<template>
  <div>
    <div>
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <th>ID</th>
          <th>Title</th>
          <th>Time limit</th>
          <th>Memory limit</th>
          <th>Point</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="(problem, index) in this.contest.problems" :key="problem.id">
            <th>{{ problem.id }}</th>
            <td>{{ problem.title }}</td>
            <td>{{ problem.timeLimit / 1000000000.0 }}s</td>
            <td>{{ problem.memoryLimit }}MiB</td>
            <td>TODO</td>
            <td>
              <button
                class="button is-danger"
                :disabled="sending"
                @click="onDelete(index)"
                >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <error-notification :error="error"/>
    </div>
    <div>
      <button class="button is-primary" :disabled="sending" @click="onAdd">Add</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/api';
import ErrorNotification from '../common/ErrorNotification';

export default {
  name: 'ContestProblemsConfig',
  components: {
    ErrorNotification,
  },
  data() {
    return {
      sending: false,
      error: null,
    };
  },
  computed: {
    ...mapState('koneko', [
      'sessionID',
    ]),
  },
  props: [
    'contest',
  ],
  methods: {
    async onAdd() {
      const problem = {
        title: '新しい問題',
        body: '',
        inputFormat: '',
        outputFormat: '',
        constraints: '',
        samples: [],
        timeLimit: 1000000000,
        memoryLimit: 256,
        judgeType: 0,
        judgeSourceCode: '',
      };
      this.sending = true;
      try {
        const res = (await api.createContestProblem(this.sessionID, this.contest.id, problem)).data;
        this.error = null;
        this.contest.problems.push(res);
      } catch (e) {
        this.error = e;
      } finally {
        this.sending = false;
      }
    },
    async onDelete(index) {
      this.sending = true;
      try {
        await api.deleteProblem(this.sessionID, this.contest.problems[index].id);
        this.error = null;
        this.$delete(this.contest.problems, index);
      } catch (e) {
        this.error = e;
      } finally {
        this.sending = false;
      }
    },
  },
};
</script>
