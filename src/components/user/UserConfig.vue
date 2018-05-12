<template>
  <div>
    <div class="field">
      <label class="label">表示名</label>
      <input
          class="input"
          type="text"
          placeholder="表示名を入力"
          required
          :class="{ 'is-danger': showWarningDisplayName }"
          :value="this.value.displayName"
          @input="onInputDisplayName"
          />
      <label class="help is-danger" v-show="showWarningDisplayName">
        2文字以上25文字以下である必要があります。
      </label>
    </div>
    <div class="field">
      <label class="label">ユーザー名</label>
      <input
          class="input"
          type="text"
          placeholder="ユーザー名を入力"
          max="15"
          min="3"
          :class="{ 'is-danger': showWarningName }"
          required
          :value="this.value.name"
          @input="onInputName"
          />
      <label class="help is-danger" v-show="showWarningName">
        半角英数、"_"、"."、"-"で3文字以上15文字以下である必要があります。
      </label>
    </div>
    <div class="field">
      <new-password-input v-model="this.value.password"/>
    </div>
  </div>
</template>

<script>
import NewPasswordInput from '../common/NewPasswordInput';

export default {
  name: 'UserConfig',
  components: {
    NewPasswordInput,
  },
  props: [
    'value',
  ],
  computed: {
    isValidDisplayName() {
      const displayName = this.value.displayName;
      return displayName && displayName.length >= 2 && displayName.length <= 25;
    },
    showWarningDisplayName() {
      return this.value.displayName && !this.isValidDisplayName;
    },
    isValidName() {
      const name = this.value.name;
      return name && /^[a-zA-Z0-9_\-.]{3,15}/.test(name);
    },
    showWarningName() {
      return this.value.name && !this.isValidName;
    },
  },
  methods: {
    onInputDisplayName(event) {
      this.value.displayName = event.target.value;
      this.checkValid();
    },
    onInputName(event) {
      this.value.name = event.target.value;
      this.checkValid();
    },
    checkValid() {
      const isValid = this.isValidDisplayName && this.isValidName && this.value.password !== null;
      this.$emit('validated', isValid);
    },
  },
};
</script>
