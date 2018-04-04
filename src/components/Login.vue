<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Login</h3>
          <p class="subtitle has-text-grey">Please login to proceed.</p>
          <div class="box">
            <form v-on:submit.prevent="onLogin">
              <div class="field">
                <div class="control">
                  <input
                    required
                    class="input is-large"
                    type="email"
                    placeholder="Your Email"
                    autofocus=""
                    v-model="email"
                    @focus="clearLog"
                    @keydown="clearLog"
                  >
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    required
                    class="input is-large"
                    type="password"
                    placeholder="Your Password"
                    v-model="password"
                    @focus="clearLog"
                    @keydown="clearLog"
                  >
                </div>
              </div>
              <p class="error">{{ errorMsg }}</p>
              <button
                type="submit"
                class="button is-block is-info is-large is-fullwidth"
                :disabled="sending"
              >
                Login
              </button>
            </form>
          </div>
          <p class="has-text-grey">
            <a href="../">Sign Up</a> &nbsp;·&nbsp;
            <a href="../">Forgot Password</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
      errorMsg: '',
      sending: false,
    };
  },
  computed: {
    ...mapState('auth', [
      'error',
      'sessionID',
    ]),
  },
  methods: {
    ...mapActions('auth', ['login']),
    clearLog() {
      this.errorMsg = '';
    },
    async onLogin() {
      if (this.sending) return false;
      this.sending = true;
      await this.login({
        email: this.email,
        password: this.password,
      });
      if (this.error != null) {
        // eslint-disable-next-line no-console
        console.error(this.error.response);
        if (this.error.response) {
          this.errorMsg = `${this.error.response.data.message}(${this.error.response.status})`;
        } else {
          this.errorMsg = 'サーバーと通信できてないかも(汗)';
        }
        this.sending = false;
        return false;
      }
      this.$router.push({ name: 'Top' });
      return true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error{
  color:red;
}
</style>
