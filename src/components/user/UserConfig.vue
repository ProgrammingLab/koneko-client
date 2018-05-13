<template>
  <div>
    <div class="field">
      <label class="label">メールアドレス</label>
      <input
        class="input is-static"
        type="email"
        required
        readonly
        :disabled="disabled"
        :value="this.value.email"
        />
    </div>
    <div class="field">
      <label class="label">表示名</label>
      <input
          class="input"
          type="text"
          placeholder="表示名を入力"
          required
          :disabled="disabled"
          :class="{ 'is-danger': showWarningDisplayName }"
          :value="this.user.displayName"
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
          maxlength="15"
          :disabled="disabled"
          :class="{ 'is-danger': showWarningName }"
          required
          :value="this.user.name"
          @input="onInputName"
          />
      <label class="help is-danger" v-show="showWarningName">
        半角英数、"_"、"."、"-"で3文字以上15文字以下である必要があります。
      </label>
    </div>
    <div class="field">
      <new-password-input
        :disabled="disabled"
        :value="this.user.password"
        @input="onInputPassword"
        />
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
  data() {
    return {
      user: {
        email: null,
        displayName: null,
        name: null,
        password: null,
      },
    };
  },
  props: [
    'value',
    'disabled',
  ],
  computed: {
    isValidDisplayName() {
      const displayName = this.user.displayName;
      return displayName && displayName.length >= 2 && displayName.length <= 25;
    },
    showWarningDisplayName() {
      return this.user.displayName && !this.isValidDisplayName;
    },
    isValidName() {
      const name = this.user.name;
      return name && /^[a-zA-Z0-9_\-.]{3,15}/.test(name);
    },
    showWarningName() {
      return this.user.name && !this.isValidName;
    },
  },
  methods: {
    onInputDisplayName(event) {
      this.user.displayName = event.target.value;
      this.checkValid();
    },
    onInputName(event) {
      this.user.name = event.target.value;
      this.checkValid();
    },
    onInputPassword(password) {
      this.user.password = password;
      this.checkValid();
    },
    checkValid() {
      const isValid = this.isValidDisplayName && this.isValidName && this.user.password !== null;
      if (isValid) {
        this.user.email = this.value.email;
        this.$emit('input', this.user);
      }
      this.$emit('validated', isValid);
    },
  },
};
</script>
