<template>
  <span :class="getStatusStyle" v-if="0 <= status && status <= 10">
    <span class="icon" v-if="status <= 1">
      <i class="fas fa-spinner fa-spin"></i>
    </span>
    <template v-else>
      {{ getStatusCode }}
    </template>
  </span>
</template>


<script>
export default {
  name: 'Tag',
  props: { status: Number },
  computed: {
    getStatusCode() {
      const code = [
        'WJ', 'WJ', 'AC', 'PE', 'WA', 'TLE',
        'MLE', 'RE', 'CE', 'OLE', 'UE',
      ];
      return code[this.status];
    },
    getStatusStyle() {
      const style = [
        '', '', 'is-success', 'is-warning', 'is-warning', 'is-warning',
        'is-warning', 'is-danger', 'is-danger', 'is-danger', 'is-danger',
      ];
      return [style[this.status], 'tag is-rounded', 'is-pulled-right'];
    },
  },
};
</script>
