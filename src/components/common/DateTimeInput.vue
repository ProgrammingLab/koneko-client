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

export default {
  name: 'DateTimeInput',
  props: [
    'value',
    'rawValue',
    'required',
    'placeholder',
  ],
  methods: {
    updateValue(value) {
      const formattedValue = moment(new Date(value)).format('YYYY-MM-DDTHH:mm:ssZ');
      this.$emit('input', formattedValue);
    },
  },
};
</script>
