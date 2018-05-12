<template>
  <form v-on:submit.prevent="onSubmit" v-if="problem">
   <div class="field">
      <label class="label">タイトル</label>
      <div class="control">
        <input required class="input" type="text" placeholder="タイトル" v-model="problem.title">
      </div>
    </div>
    <div class="field">
      <label class="label">時間制限</label>
      <div class="field has-addons">
        <div class="control">
          <input
            required
            class="input"
            type="number"
            placeholder="時間制限"
            max="60"
            min="1"
            step="1"
            v-model.number="timeLimit"
            />
        </div>
        <p class="control">
          <a class="button is-static">
            sec
          </a>
        </p>
      </div>
    </div>
    <div class="field">
      <label class="label">メモリ制限</label>
      <div class="field has-addons">
        <div class="control">
          <input
            required
            class="input"
            type="number"
            placeholder="メモリ制限"
            max="512"
            min="64"
            step="1"
            v-model.number="problem.memoryLimit"
            />
        </div>
        <p class="control">
          <a class="button is-static">
            MiB
          </a>
        </p>
      </div>
    </div>
    <div class="field">
      <label class="label">問題文</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="Statement"
          rows="10"
          v-model="problem.body"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">制約</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="制約"
          rows="5"
          v-model="problem.constraints"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">入力形式</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="入力形式"
          rows="5"
          v-model="problem.inputFormat"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">出力形式</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="出力形式"
          rows="5"
          v-model="problem.outputFormat"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">ジャッジ方法</label>
      <div class="select">
        <select v-model.number="problem.judgeType">
          <option value="0">ノーマル</option>
          <option value="1">誤差許容</option>
          <option value="2">スペシャル</option>
        </select>
      </div>
    </div>
    <div class="field" v-if="problem.judgeType === 1">
      <label class="label">許容する相対誤差または絶対誤差の大きさ</label>
      <div class="field has-addons">
          <div class="control">
            <a class="button is-static">
              10^
            </a>
          </div>
          <div class="control">
            <input
              required
              class="input"
              type="number"
              placeholder="Difference"
              max="0"
              min="-20"
              step="1"
              v-model.number="difference"
              />
          </div>
        </div>
    </div>
    <div class="field" v-if="problem.judgeType === 2">
      <source-code-input title="ジャッジソースコード" v-model="specialJudgeConfig"/>
    </div>
    <div>
      <div class="field" v-for="(sample, index) in problem.samples" :key="index">
        <hr>
        <label class="label">
          サンプル #{{ index + 1 }}
          <a class="button is-small is-danger" @click="onDeleteSample(index)">削除</a>
        </label>
        <div class="field">
          <label class="label">入力例</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="入力例"
              rows="5"
              v-model="sample.input"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">出力例</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="出力例"
              rows="5"
              v-model="sample.output"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">説明</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="説明"
              rows="5"
              v-model="sample.description"
            />
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <a class="button is-primary" @click="onAddSample">サンプルを追加</a>
        </div>
      </div>
      <hr>
    </div>
    <div class="field">
      <error-notification :error="error"/>
      <div class="control">
        <button
          type="submit"
          class="button"
          :class="{ 'is-loading': sending }"
          >
          保存
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/api';
import ErrorNotification from '../common/ErrorNotification';
import SourceCodeInput from '../common/SourceCodeInput';

const oneSec = 1000000000;

export default {
  name: 'EditProblemBody',
  components: {
    ErrorNotification,
    SourceCodeInput,
  },
  props: [
    'problem',
  ],
  data() {
    return {
      sending: false,
      error: null,
    };
  },
  computed: {
    ...mapState('koneko', ['sessionID']),
    timeLimit: {
      get() {
        return this.problem.timeLimit / oneSec;
      },
      set(val) {
        this.problem.timeLimit = val * oneSec;
      },
    },
    difference: {
      get() {
        return Math.ceil(Math.log10(this.problem.judgementConfig.difference));
      },
      set(value) {
        this.problem.judgementConfig.difference = 10 ** value;
      },
    },
    specialJudgeConfig: {
      get() {
        const config = this.problem.judgementConfig;
        const res = {
          sourceCode: config.judgeSourceCode,
          languageID: config.languageID,
        };
        return res;
      },
      set(value) {
        const config = this.problem.judgementConfig;
        config.judgeSourceCode = value.sourceCode;
        config.languageID = value.languageID;
      },
    },
  },
  methods: {
    onDeleteSample(index) {
      this.$delete(this.problem.samples, index);
    },
    onAddSample() {
      this.problem.samples.push({
        input: '',
        output: '',
        description: '',
      });
    },
    async onSubmit() {
      this.sending = true;
      try {
        await api.updateProblem(this.sessionID, this.problem);
        this.error = null;
        this.$emit('onSubmitted');
      } catch (e) {
        this.error = e;
      } finally {
        this.sending = false;
      }
    },
  },
};
</script>
