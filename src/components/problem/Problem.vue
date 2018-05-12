<template>
  <section class="section" v-if="problem">
    <h1 class="title">{{ problem.title }}</h1>
    <div>配点: {{ problem.point }}</div>
    <div>時間制限: {{ timeLimit }} sec / メモリ制限: {{ problem.memoryLimit }} MiB</div>
    <hr>
    <div class="content">
      <h2>問題文</h2>
      <p><markdown :body="problem.body"/></p>

      <h2>制約</h2>
      <p><markdown :body="problem.constraints"/></p>

      <h2>入力形式</h2>
      <p><markdown :body="problem.inputFormat"/></p>

      <h2>出力形式</h2>
      <p><markdown :body="problem.outputFormat"/></p>

      <div v-for="(sample, index) in problem.samples" :key="sample.id">
        <hr>
        <h2>サンプル #{{ index + 1 }}</h2>
        <h3>
          入力例
          <button
            class="button is-small"
            v-clipboard:copy="sample.input"
            >
              コピー
          </button>
          </h3>
        <p>
          <pre>{{sample.input}}</pre>
        <h3>
          出力例
          <button
            class="button is-small"
            v-clipboard:copy="sample.output"
            >
              コピー
          </button>
        </h3>
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
