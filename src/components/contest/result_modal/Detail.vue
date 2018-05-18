<template>
  <div>
    <h3 class="title">提出ID({{detail.id}})</h3>
    <h4>ソースコード</h4>
    <pre v-highlightjs="detail.sourceCode">
      <code class="cpp"></code>
    </pre>
    
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('koneko/contests/results/detail', [
      'detail',
    ]),
  },
};
</script>

<style lang="css">
</style>
