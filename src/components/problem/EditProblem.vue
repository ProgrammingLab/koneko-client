<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Edit Problem</h1>
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
        <edit-problem-body :problem="problem"/>
      </div>
      <div v-show="activeTab === 'preview'">
        <problem :problem="problem"/>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import api from '@/api';
import Problem from './Problem';
import EditProblemBody from './EditProblemBody';

export default {
  name: 'EditProblem',
  components: {
    Problem,
    EditProblemBody,
  },
  data() {
    return {
      problem: null,
    };
  },
  async created() {
    this.problem = (await api.getProblem(this.sessionID, this.$route.params.id)).data;
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
};
</script>
