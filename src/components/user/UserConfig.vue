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
      <div class="control" :class="{ 'is-loading': checkingUserName }">
        <input
          class="input"
          type="text"
          placeholder="ユーザー名を入力"
          maxlength="15"
          :disabled="disabled"
          :class="{ 'is-danger': showWarningName, 'is-success': showSuccessUserName }"
          required
          :value="this.userName"
          @input="onInputName"
          />
      </div>
      <label class="help is-danger" v-show="showWarningName">
        半角英数、"_"、"."、"-"で3文字以上15文字以下である必要があります。
      </label>
      <label class="help is-danger" v-show="isExistsName">
        ユーザー名はすでに使用されています。
      </label>
      <label class="help is-success" v-show="userName && !showWarningName && !isExistsName">
        ユーザー名は使用可能です。
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
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import api from '@/api';
import NewPasswordInput from '../common/NewPasswordInput';

export default {
  name: 'UserConfig',
  components: {
    NewPasswordInput,
  },
  data() {
    const observable = new Subject();
    return {
      user: {
        email: null,
        displayName: null,
        name: null,
        password: null,
      },
      checkingUserName: false,
      checkedUserName: false,
      userName: null,
      userNameObservable: observable,
    };
  },
  created() {
    this.userNameObservable.pipe(debounceTime(500)).subscribe({
      next: async (userName) => {
        this.checkingUserName = true;
        try {
          await api.getUser(userName);
          // すでに存在するユーザー名なのでNG
          this.checkedUserName = false;
        } catch (e) {
          if (!e.response || e.response.status !== 404) {
            this.error = e;
          } else {
            // 存在しないユーザー名なのでOK
            this.checkedUserName = true;
          }
        } finally {
          this.checkingUserName = false;
          this.user.name = userName;
          this.checkValid();
        }
      },
    });
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
    isExistsName() {
      return this.userName && !this.checkedUserName && !this.checkingUserName;
    },
    showWarningName() {
      return this.user.name && !this.isValidName;
    },
    showSuccessUserName() {
      return this.userName && !this.showWarningName && !this.isExistsName;
    },
  },
  methods: {
    onInputDisplayName(event) {
      this.user.displayName = event.target.value;
      this.checkValid();
    },
    async onInputName(event) {
      this.checkingUserName = true;
      this.checkedUserName = false;
      this.userName = event.target.value;
      this.userNameObservable.next(event.target.value);
      this.checkValid();
    },
    onInputPassword(password) {
      this.user.password = password;
      this.checkValid();
    },
    checkValid() {
      const isValid = this.isValidDisplayName &&
        this.isValidName &&
        !this.checkingUserName &&
        this.checkedUserName &&
        this.user.password !== null;
      if (isValid) {
        this.user.email = this.value.email;
        this.$emit('input', this.user);
      }
      this.$emit('validated', isValid);
    },
  },
};
</script>
