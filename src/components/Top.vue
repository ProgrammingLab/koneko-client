<template lang="html">
  <p>
    <router-link to="/admin">Go to Foo</router-link>
    <input v-model='hoge'>
    <markdown v-bind:body="hoge"></markdown>
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
    };
  },
};
</script>

<style lang="css">
</style>
