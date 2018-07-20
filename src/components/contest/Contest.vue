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
                  <span
                    v-if="isFlexibleContest && isEntered"
                    class="is-size-5 has-text-weight-bold"
                  >
                    あなたのコンテスト時間:
                    {{formatDate(flexibleCreatedAt)}} ~
                    {{formatDate(flexibleEndAt)}}<br>
                  </span>
                  <span class="is-size-7">
                    作成日時: {{formatDate(createdAt)}}<br>
                    最終更新: {{formatDate(updatedAt)}}
                  </span>
                </div>
              </div>
            </div>
            <div class="navbar-end">
              <span
                v-if="enterable"
                class="navbar-item"
              >
                <button
                  @click="myEnter"
                  class="button is-large is-outlined"
                  :disabled="this.isFlexibleContest && this.countDownTimer !== 'Already started'"
                >
                  コンテストに参加する
                </button>
              </span>
              <span v-else class="navbar-item">
                <button
                  @click="showResultList"
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
      <EnterConfirmationModal
        :isActive="showConfirmationModal"
        @close="showConfirmationModal = false"
      />
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
                    <tag :status="problem.status" class="float-right"/>
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
                    <span v-if="detail.point > 0">
                      {{ detail.scoreTime | formatDuration }}<br>
                    </span>
                    <span class="has-text-danger" v-if="detail.wrongCount !== 0">
                      (-{{detail.wrongCount}})
                    </span>
                  </td>
                  <td v-else>-</td>
                  <td>
                    {{column.totalPoint}}<br>
                    <span v-if="column.totalPoint > 0">
                      {{ column.scoreTime | formatDuration }}<br>
                    </span></td>
                </tr>
              </tbody>
            </table>
          </Modal>
          <ResultModal
            :isActive="showResultListModal"
            @close="showResultListModal = false"
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
import ResultModal from './result_modal/ResultModal';
import EnterConfirmationModal from './EnterConfirmationModal';

import Tag from './Tag';

export default {
  name: 'Contest',
  data() {
    return {
      showDescription: false,
      showStandingsModal: false,
      showResultListModal: false,
      showSubmitModal: false,
      showConfirmationModal: false,
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
      'duration',
      'flexibleCreatedAt',
    ]),
    ...mapState('koneko/timeDiff', [
      'timeDiff',
    ]),
    ...mapGetters('koneko/contests', [
      'canEnter',
      'isEntered',
      'isWriter',
      'isFlexibleContest',
      'flexibleEndAt',
    ]),
    enterable() {
      return this.canEnter &&
        !this.isEntered &&
        this.problems === null
      ;
    },
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
    ...mapActions('koneko/contests/results', [
      'getResults',
    ]),
    ...mapMutations('koneko/contests', [
      'setRequiredWatching',
    ]),
    toggleDescription() {
      this.showDescription = !this.showDescription;
    },
    async showStandings() {
      await this.getStandings();
      this.showStandingsModal = true;
    },
    async showResultList() {
      await this.getResults();
      this.showResultListModal = true;
    },
    myEnter() {
      if (this.isFlexibleContest) {
        this.showConfirmationModal = true;
      } else {
        this.enter();
      }
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
    submitCode(value) {
      this.submit({ value, problemIndex: this.activeTab });
    },
  },
  filters: {
    formatDuration(duration) {
      const sec = Math.floor(duration / 1000000000);
      const min = Math.floor(sec / 60);
      const hour = Math.floor(min / 60);
      const mm = `00${min % 60}`.slice(-2);
      const ss = `00${sec % 60}`.slice(-2);
      return `${hour}:${mm}:${ss}`;
    },
  },
  components: {
    Tag,
    Modal,
    Problem,
    EnterConfirmationModal,
    ErrorNotification,
    SubmitModal,
    ResultModal,
  },
};
</script>

<style scoped>
  .tab {
    padding-right: 0;
    border-right: 5px solid hsl(204, 86%, 53%);
    min-width: 100px;
  }
  .float-right {
    float: right;
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
