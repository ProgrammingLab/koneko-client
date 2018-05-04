<template>
  <section class="section" v-show="problem">
    <h1 class="title">{{ problem.title }}</h1>
    <div>Score: {{ problem.point }}</div>
    <div>Time Limit: {{ timeLimit }} sec / Memory Limit: {{ problem.memoryLimit }} MiB</div>
    <hr>
    <div class="content">
      <h2>Statement</h2>
      <p><markdown :body="problem.body"/></p>

      <h2>Constraints</h2>
      <p><markdown :body="problem.constraints"/></p>

      <h2>Input</h2>
      <p><markdown :body="problem.inputFormat"/></p>

      <h2>Output</h2>
      <p><markdown :body="problem.outputFormat"/></p>

      <div v-for="(sample, index) in problem.samples" :key="sample.id">
        <hr>
        <h2>Sample #{{ index + 1 }}</h2>
        <h3>Input</h3>
        <p>
          <pre>{{sample.input}}</pre>
        <h3>Output</h3>
        <p>
          <pre>{{sample.output}}</pre>
        </p>
        <p><markdown :body="sample.description"/></p>
      </div>
    </div>
  </section>
</template>

<script>
import Markdown from '../common/Markdown';

export default {
  name: 'Problem',
  components: {
    Markdown,
  },
  props: [
    'problem',
  ],
  computed: {
    timeLimit() {
      return this.problem.timeLimit / 1000000000;
    },
  },
};
</script>
