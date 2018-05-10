<template>
  <div v-if="problem">
    <div class="field">
      <label class="label">Upload test cases</label>
      <div class="field">
        <div class="file has-name">
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              name="resume"
              accept="application/zip"
              @change="onFileChange"
              :disabled="sending"
              >
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Choose a file…
              </span>
            </span>
            <span class="file-name">
              {{ file && file.name }}
            </span>
          </label>
        </div>
        <div class="help">
          Please see
          <a href="https://github.com/gedorinku/koneko-online-judge/wiki/Problems#%E3%83%86%E3%82%B9%E3%83%88%E3%82%B1%E3%83%BC%E3%82%B9%E3%82%92%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89" target="_blank">
            Koneko API reference
          </a>
          !
        </div>
      </div>
      <error-notification :error="uploadError"/>
      <div class="field">
        <div class="control">
          <button
            class="button"
            @click="onUpload"
            :class="{ 'is-loading': sending }"
            :disabled="!file"
            >Upload
          </button>
        </div>
      </div>
    </div>
    <hr>
    <form v-on:submit.prevent="onSubmit">
      <label class="label">Case set scores</label>
      <div class="field" v-for="(caseSet, index) in caseSets" :key="index">
        <label class="label">Set #{{ index + 1 }}</label>
        <div class="field has-addons">
          <div class="control">
            <input
              required
              class="input"
              type="number"
              placeholder="Score"
              max="4000000"
              min="0"
              step="1"
              v-model.number="caseSet.point"
              />
          </div>
          <p class="control">
            <a class="button is-static">
              points
            </a>
          </p>
        </div>
      </div>
      <error-notification :error="submitError"/>
      <div class="field">
        <div class="control">
          <button class="button" :class="{ 'is-loading': sending }">
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/api';
import ErrorNotification from '../common/ErrorNotification';

export default {
  name: 'EditTestCases',
  components: {
    ErrorNotification,
  },
  data() {
    return {
      file: null,
      uploadError: null,
      submitError: null,
      sending: false,
    };
  },
  computed: {
    ...mapState('koneko', ['sessionID']),
    caseSets() {
      if (!this.problem) {
        return null;
      }
      if (this.problem.caseSets) {
        return this.problem.caseSets;
      }
      return null;
    },
  },
  props: [
    'problem',
  ],
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.file = files[0];
    },
    async onUpload() {
      this.sending = true;
      try {
        await api.uploadTestCases(this.sessionID, this.problem.id, this.file);
        this.uploadError = null;
        this.$emit('onSubmitted');
      } catch (e) {
        this.uploadError = e;
      } finally {
        this.sending = false;
      }
    },
    async onSubmit() {
      this.sending = true;
      try {
        await api.updateCaseSetScores(this.sessionID, this.problem);
        this.submitError = null;
        this.$emit('onSubmitted');
      } catch (e) {
        this.submitError = e;
      } finally {
        this.sending = false;
      }
    },
  },
};
</script>

<style>

</style>