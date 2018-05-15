<template>
  <span :class="getStyleClass" v-if="0 <= status && status <= 10">
    {{ getStatusCode }}
  </span>
</template>


<script>
export default {
  name: 'Tag',
  props: { status: Number },
  computed: {
    getStatusCode() {
      const code = [
        'IQ', 'WJ', 'AC', 'PE', 'WA', 'TLE',
        'MLE', 'RE', 'CE', 'OLE', 'UE',
      ];
      return code[this.status];
    },
    getStyleClass() {
      const style = [
        '', '', 'is-success', 'is-warning', 'is-warning', 'is-warning',
        'is-warning', 'is-danger', 'is-danger', 'is-danger', 'is-danger',
      ];
      return [style[this.status], 'tag', 'is-rounded', 'is-pulled-right'];
    },
  },
};
</script>
