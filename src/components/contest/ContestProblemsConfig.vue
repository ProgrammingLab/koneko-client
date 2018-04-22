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
          <tr v-for="problem in this.contest.problems" :key="problem.id">
            <th>{{ problem.id }}</th>
            <td>{{ problem.title }}</td>
            <td>{{ problem.timeLimit / 1000000000.0 }}s</td>
            <td>{{ problem.memoryLimit }}MiB</td>
            <td>TODO</td>
            <td>
              <button class="button is-danger" :disabled="sending">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <button class="button is-primary" :disabled="sending">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContestProblemsConfig',
  data() {
    return {
      sending: false,
    };
  },
  props: [
    'contest',
  ],
  created() {
    console.log(this.contest.problems);
  },
};
</script>
