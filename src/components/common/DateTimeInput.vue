<template>
  <input
    :required="required"
    class="input"
    type="datetime-local"
    :placeholder="placeholder"
    :value="rawValue"
    v-on:input="updateValue($event.target.value)"
  >
</template>

<script>
import moment from 'moment';

const format = 'YYYY-MM-DDTHH:mm:ssZ';

export default {
  name: 'DateTimeInput',
  data() {
    return {
      rawValue: null,
    };
  },
  props: [
    'value',
    'required',
    'placeholder',
  ],
  watch: {
    value(val) {
      this.rawValue = moment(val, format).format('YYYY-MM-DDTHH:mm');
    },
  },
  methods: {
    updateValue(value) {
      const formattedValue = moment(new Date(value)).format(format);
      this.$emit('input', formattedValue);
    },
  },
};
</script>
