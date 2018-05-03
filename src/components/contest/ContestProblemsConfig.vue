<template>
  <div>
    <delete-confirmation-modal @onClickDelete="onProceddToDelete"/>
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
            <td>
              <router-link :to="`./problems/${problem.id}/edit`">
                {{ problem.title }}
              </router-link>
            </td>
            <td>{{ problem.timeLimit / 1000000000.0 }}s</td>
            <td>{{ problem.memoryLimit }}MiB</td>
            <td>TODO</td>
            <td>
              <button
                class="button is-danger"
                :disabled="sending"
                @click="onClickDelete(index)"
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
import { mapActions, mapState } from 'vuex';
import api from '@/api';
import ErrorNotification from '../common/ErrorNotification';
import DeleteConfirmationModal from '../common/DeleteConfirmationModal';

export default {
  name: 'ContestProblemsConfig',
  components: {
    ErrorNotification,
    DeleteConfirmationModal,
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
    ...mapActions('koneko/deleteConfirmationModal', [
      'openDeleteConfirmationModal',
    ]),
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
    onClickDelete(index) {
      const problemTitle = this.contest.problems[index].title;
      const body = `This action cannot be undone. This will permanently delete the ${problemTitle} problem, test cases, and submissions.`;
      this.openDeleteConfirmationModal({ body, argument: index });
    },
    async onProceddToDelete(index) {
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
