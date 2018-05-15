<template>
  <div v-if="problem">
    <div class="field">
      <label class="label">テストケースをアップロード(*.zip)</label>
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
                ファイルを選択…
              </span>
            </span>
            <span class="file-name">
              {{ file && file.name }}
            </span>
          </label>
        </div>
        <div class="help">
          zipファイルの形式については
          <a href="https://github.com/gedorinku/koneko-online-judge/wiki/Problems#%E3%83%86%E3%82%B9%E3%83%88%E3%82%B1%E3%83%BC%E3%82%B9%E3%82%92%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89" target="_blank">
            こねこのAPIリファレンス
          </a>
          を参照してください。
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
            >
            アップロード
          </button>
        </div>
      </div>
    </div>
    <hr>
    <form v-on:submit.prevent="onSubmit">
      <label class="label">ケースセットの配点</label>
      <div class="field" v-for="(caseSet, index) in caseSets" :key="index">
        <label class="label">ケースセット #{{ index + 1 }}</label>
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
            保存
          </button>
        </div>
      </div>
    </form>
    <hr>
    <div class="field">
      <label class="label">リジャッジ</label>
      <div class="control">
        <button class="button" :class="{ 'is-loading': sending }" @click="onRejudge">
          リジャッジを開始する
        </button>
      </div>
    </div>
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
    async onRejudge() {
      this.sending = true;
      try {
        await api.rejudgeProblem(this.sessionID, this.problem.id);
        this.$emit('onRejudgeStarted');
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
