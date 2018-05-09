<template>
  <div>
    <div class="field">
      <label class="label">言語</label>
      <div class="select">
        <select
          :value="value.languageID"
          @input="onChangeLanguage($event.target.value)"
          >
          <option
            v-for="language in this.languages"
            :key="language.id"
            :value="language.id"
            >
            {{ language.displayName }}
          </option>
        </select>
      </div>
    </div>
    <div class="field">
      <label class="label">{{ title }}</label>
      <textarea
        class="textarea"
        placeholder="ソースコード"
        rows="10"
        required
        :value="value.sourceCode"
        @input="onInputSourceCode($event.target.value)"
        />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'SourceCodeInput',
  props: [
    'value',
    'title',
  ],
  async created() {
    await this.fetchLanguages();
  },
  computed: {
    ...mapState('koneko/languages', [
      'languages',
    ]),
  },
  methods: {
    ...mapActions('koneko/languages', [
      'fetchLanguages',
    ]),
    onInputSourceCode(newValue) {
      this.$emit('input', {
        sourceCode: newValue,
        languageID: this.value.languageID,
      });
    },
    onChangeLanguage(newValue) {
      this.$emit('input', {
        sourceCode: this.value.sourceCode,
        languageID: parseInt(newValue, 10),
      });
    },
  },
};
</script>

