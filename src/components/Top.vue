<template lang="html">
  <p>
    <router-link to="/admin">Go to Foo</router-link>
    <textarea v-model='hoge'></textarea>
    <textarea v-model='fuga'></textarea>
    <markdown v-bind:body="hoge"></markdown>
    <markdown v-bind:body="fuga"></markdown>
  </p>
</template>

<script>
import Markdown from './common/Markdown';

export default {
  components: {
    Markdown,
  },
  data() {
    return {
      hoge: '\\\\( x^2 \\\\) **hoge**',
      fuga: '\\\\( x^2 \\\\) **hoge**',
    };
  },
};
</script>

<style lang="css">
</style>
