<template>
  <div>
    <div class="container margin-bottom">
      <section class="hero is-small is-light">
        <div class="hero-body">
          <nav class="navbar">
            <div class="navbar-brand">
              <div>
                <h1 class="title">{{title}}</h1>
                <div class="subtitle is-6">
                  <span class="is-size-5 has-text-weight-bold">
                    期間: {{formatDate(startAt)}} ~ {{formatDate(endAt)}}<br>
                  </span>
                  <span class="is-size-7">
                    作成日時: {{formatDate(createdAt)}}<br>
                    最終更新: {{formatDate(updatedAt)}}
                  </span>
                </div>
              </div>
            </div>
            <div class="navbar-end">
              <span v-if="canEnter && !isEntered && problems === null" class="navbar-item">
                <button @click="enter" class="button is-large is-outlined">
                  コンテストに参加する
                </button>
              </span>
              <span v-else class="navbar-item">
                <button
                  @click="showSubmissionList"
                  class="button is-outlined"
                  :disabled="problems === null || problems.length === 0"
                >
                  提出一覧
                </button>
                <button
                  @click="showStandings"
                  class="button is-outlined"
                  :disabled="problems === null || problems.length === 0"
                >
                  順位
                </button>
                <router-link
                  v-if="isWriter"
                  class="button is-link is-hovered"
                  :to="{ path: `${$route.path}/edit` }"
                >
                  編集
                </router-link>
              </span>
            </div>
          </nav>
        </div>
      </section>
      <article class="message is-light">
        <div class="message-header">
          <button class="button is-text is-small" @click="toggleDescription">
            {{ showDescription ? "閉じる" : "詳細" }}
          </button>
        </div>
        <div class="message-body content" v-show="showDescription">
          <h3 class="is-size-6">作問者</h3>
          <ul>
            <li v-for="(writer, index) in writers" :key="index">{{writer.displayName}}</li>
          </ul>
          <p>{{description}}</p>
        </div>
      </article>
    </div>
    <div class="container">
      <ErrorNotification :error="error"/>
      <template v-if="problems !== null">
        <div class="columns is-mobile" v-if="problems.length !== 0">
          <div class="column is-1 tab">
            <aside>
              <ul class="menu-list">
                <li v-for="(problem, index) in problems" :key="index">
                  <a
                    :href="'#' + num2alpha(index)"
                    :class="['tab-button', index == activeTab ? 'active-tab-button': '']"
                    @click="activeTab = index"
                  >
                    {{ num2alpha(index).toUpperCase() }}
                    <tag :status="problem.status"/>
                  </a>
                </li>
              </ul>
            </aside>
          </div>
          <div class="column">
            <Problem :problem="problems[activeTab]"/>
            <section class="section">
              <button class="button is-link" @click="showSubmitModal = true">
                提出
              </button>
            </section>
          </div>
          <Modal
            :isActive="showStandingsModal"
            @close="showStandingsModal = false"
            isWide
            title="順位"
          >
            <table class="table is-fullwidth fixed-table">
              <thead>
                <tr>
                  <th>順位</th>
                  <th>名前</th>
                  <th v-for="(_, i) in problems" :key="i">
                    {{num2alpha(i).toUpperCase()}}
                  </th>
                  <th>合計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(column, i) in standings" :key="i">
                  <td>{{i + 1}}</td>
                  <td>{{column.displayName}}</td>
                  <td
                    v-for="(detail, j) in column.details"
                    :key="j"
                    v-if="detail"
                    :class="{'is-success': detail.accepted}"
                  >
                    {{detail.point}}<br>
                    <span v-if="detail.accepted">
                      {{getElapsedTime(detail.updatedAt)}}<br>
                    </span>
                    <span class="has-text-danger" v-if="detail.wrongCount !== 0">
                      (-{{detail.wrongCount}})
                    </span>
                  </td>
                  <td v-else>-</td>
                  <td>{{column.totalPoint}}</td>
                </tr>
              </tbody>
            </table>
          </Modal>
          <SubmissionListModal
            :isActive="showSubmissionListModal"
            @close="showSubmissionListModal = false"
          />
          <SubmitModal
            :isActive="showSubmitModal"
            @close="showSubmitModal = false"
            :problem="problems[activeTab]"
            @submit="submitCode"
          />
        </div>
      </template>
      <div v-else class="columns is-mobile">
        <div class="column is-4">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <div class="tile is-child box content">
                <p class="title">参加者一覧</p>
                <ul>
                  <li v-for="(participant, index) in participants" :key="index">
                    {{participant.displayName}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <div class="tile is-child box">
                <p class="title has-text-centered">
                  <span v-if="countDownTimer == 'Already started'">コンテスト開催中</span>
                  <span v-else>コンテスト開催まで {{countDownTimer}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import moment from 'moment';
import Problem from '@/components/problem/Problem';
import ErrorNotification from '@/components/common/ErrorNotification';
import Modal from '@/components/common/Modal';
import SubmitModal from '@/components/problem/SubmitModal';
import SubmissionListModal from './SubmissionListModal';

import Tag from './Tag';

export default {
  name: 'Contest',
  data() {
    return {
      showDescription: false,
      showStandingsModal: false,
      showSubmissionListModal: false,
      showSubmitModal: false,
      activeTab: 0,
      diff: 300000,
    };
  },
  computed: {
    ...mapState('koneko/contests', [
      'createdAt',
      'updatedAt',
      'title',
      'description',
      'startAt',
      'endAt',
      'writers',
      'problems',
      'standings',
      'participants',
      'id',
      'error',
    ]),
    ...mapState('koneko/timeDiff', [
      'timeDiff',
    ]),
    ...mapGetters('koneko/contests', [
      'canEnter',
      'isEntered',
      'isWriter',
    ]),
    countDownTimer() {
      if (this.diff < 0) return 'Already started';
      const DD = `00${Math.floor(this.diff / 1000 / 60 / 60 / 24)}`.slice(-2);
      const HH = `00${Math.floor(this.diff / 1000 / 60 / 60) % 24}`.slice(-2);
      const mm = `00${Math.floor(this.diff / 1000 / 60) % 60}`.slice(-2);
      const ss = `00${Math.floor(this.diff / 1000) % 60}`.slice(-2);
      return `${DD}日${HH}時間${mm}分${ss}秒`;
    },
  },
  async created() {
    this.activeTab = this.$route.hash ? this.$route.hash.charCodeAt(1) - 97 : 0;
    await this.getContest(this.$route.params.id);
    if (this.id === null) this.$router.push({ name: 'NotFound' });
    this.statusesWatcher();
    const intervalId = setInterval(() => {
      const serverTime = moment().add(this.timeDiff);
      this.diff = moment(this.startAt).diff(serverTime);
      if (this.problems !== null) {
        clearInterval(intervalId);
        return false;
      }
      if (this.diff <= 0 && this.isEntered) {
        this.getProblems();
        clearInterval(intervalId);
        return false;
      }
      return false;
    }, 1000);
  },
  beforeDestroy() {
    this.setRequiredWatching(false);
  },
  methods: {
    ...mapActions('koneko/contests', [
      'getContest',
      'statusesWatcher',
      'updateContest',
      'getProblems',
      'getStandings',
      'enter',
      'submit',
    ]),
    ...mapActions('koneko/contests/submissions', [
      'getSubmittions',
    ]),
    ...mapMutations('koneko/contests', [
      'setRequiredWatching',
    ]),
    toggleDescription() {
      this.showDescription = !this.showDescription;
    },
    showStandings() {
      this.showStandingsModal = true;
      this.getStandings();
    },
    showSubmissionList() {
      this.showSubmissionListModal = true;
      this.getSubmittions();
    },
    num2alpha(num) {
      return String.fromCharCode(97 + num);
    },
    formatDate(date, format) {
      return moment(date)
        .locale('ja')
        .format(format || 'YYYY/MM/DD(ddd) HH:mm')
      ;
    },
    getElapsedTime(data) {
      const diff = moment(data).diff(this.startAt);
      const mm = `${Math.floor(diff / 1000 / 60)}`;
      const ss = `00${Math.floor(diff / 1000) % 60}`.slice(-2);
      return `${mm}:${ss}`;
    },
    submitCode(value) {
      this.submit({ value, problemIndex: this.activeTab });
    },
  },
  components: {
    Tag,
    Modal,
    Problem,
    ErrorNotification,
    SubmitModal,
    SubmissionListModal,
  },
};
</script>

<style scoped>
  .tab {
    padding-right: 0;
    border-right: 5px solid hsl(204, 86%, 53%);
    min-width: 100px;
  }
  .tab-button{
    border: 1px solid silver;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background-color: white;
  }
  .active-tab-button{
    border-right-color: hsl(204, 86%, 53%);
    background-color: hsl(204, 86%, 53%);
  }
  .active-tab-button:hover{
    background-color: hsl(204, 86%, 53%);
  }
  .margin-bottom{
    margin-bottom: 20px;
  }
  .fixed-table{
    table-layout: fixed;
  }
</style>
