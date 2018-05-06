<template>
  <section class="section">
    <information-modal/>
    <div class="container">
      <h1 class="title">Edit Problem</h1>
      <error-notification :error="error"/>
      <div class="tabs">
        <ul>
          <li :class="{ 'is-active': activeTab === 'edit' }">
            <router-link to="#edit">
              Edit Problem
            </router-link>
          </li>
          <li :class="{ 'is-active': activeTab === 'preview' }">
            <router-link to="#preview">
              Preview
            </router-link>
          </li>
          <li :class="{ 'is-active': activeTab === 'cases' }">
            <router-link to="#cases">
              Edit Test Cases
            </router-link>
          </li>
        </ul>
      </div>
      <div v-show="activeTab === 'edit'">
        <edit-problem-body :problem="problem" @onSubmitted="onSubmitted"/>
      </div>
      <div v-show="activeTab === 'preview'">
        <problem :problem="problem"/>
      </div>
      <div v-show="activeTab === 'cases'">
        <edit-test-cases :problem="problem" @onSubmitted="onSubmitted"/>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import api from '@/api';
import Problem from './Problem';
import EditProblemBody from './EditProblemBody';
import EditTestCases from './EditTestCases';
import ErrorNotification from '../common/ErrorNotification';
import InformationModal from '../common/InformationModal';

export default {
  name: 'EditProblem',
  components: {
    Problem,
    EditProblemBody,
    EditTestCases,
    ErrorNotification,
    InformationModal,
  },
  data() {
    return {
      problem: null,
      error: null,
    };
  },
  async created() {
    await this.fetchProblem();
  },
  computed: {
    ...mapState('koneko', ['sessionID']),
    activeTab() {
      const tab = this.$route.hash;
      if (tab) {
        return tab.substring(1);
      }
      return 'edit';
    },
  },
  methods: {
    ...mapActions('koneko/informationModal', [
      'openInformationModel',
    ]),
    async fetchProblem() {
      try {
        const res = (await api.getProblem(this.sessionID, this.$route.params.id)).data;
        if (!res.samples) {
          res.samples = [];
        }
        if (!res.caseSets) {
          res.caseSets = [];
        }
        this.problem = res;
        this.error = null;
      } catch (e) {
        this.error = e;
      }
    },
    async onSubmitted() {
      await this.fetchProblem();
      this.openInformationModel('保存しました');
    },
  },
};
</script>
