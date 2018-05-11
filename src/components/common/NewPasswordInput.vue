<template>
  <div class="field">
    <div class="field">
      <label class="label">
        新しいパスワード
      </label>
      <input
        class="input"
        type="password"
        placeholder="新しいパスワード"
        required
        max="72"
        :disabled="disabled"
        :value="password"
        @input="onInputPassword"
        :class="{ 'is-danger': isErrorPassword }"
        />
      <label class="help is-danger" v-show="isErrorPassword">
        パスワードは8文字以上72文字以下で、数字とアルファベットを含む必要があります。
      </label>
    </div>
    <div class="field">
      <label class="label">
        パスワードの再入力
      </label>
      <input
        class="input"
        type="password"
        placeholder="パスワードの再入力"
        required
        :disabled="disabled"
        :value="passwordConfirmation"
        @input="onInputPasswordConfirmation"
        :class="{ 'is-danger': isErrorConfirmation }"
        />
      <label class="help is-danger" v-show="isErrorConfirmation">
        パスワードが一致しません。
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewPasswordInput',
  props: [
    'value',
    'disabled',
  ],
  data() {
    return {
      password: null,
      passwordConfirmation: null,
      isErrorPassword: false,
      isErrorConfirmation: false,
    };
  },
  methods: {
    onInputPassword(event) {
      this.password = event.target.value;
      this.onUpdate();
    },
    onInputPasswordConfirmation(event) {
      this.passwordConfirmation = event.target.value;
      this.onUpdate();
    },
    onUpdate() {
      if ((this.password && this.passwordConfirmation) === null) {
        return;
      }
      this.isErrorConfirmation = this.password !== this.passwordConfirmation;
      this.isErrorPassword = !(/[A-Za-z]/.test(this.password) && /[0-9]/.test(this.password));
      if (this.isErrorPassword || this.isErrorPassword) {
        return;
      }
      this.$emit('input', this.password);
    },
  },
};
</script>
