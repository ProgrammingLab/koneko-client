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
              <span class="navbar-item">
                <button @click="showSubmitList" class="button is-outlined">
                  提出一覧
                </button>
                <button @click="showRanking" class="button is-outlined">
                  順位
                </button>
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
      <div class="columns is-mobile">
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
        </div>
      </div>
    </div>
    <Modal :isActive="showRankingModal" @close="showRankingModal = false" title="順位">
      <h1>aaa</h1>
    </Modal>
    <Modal :isActive="showSubmitListModal" @close="showSubmitListModal = false" title="提出一覧">
      <h1>bbb</h1>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import moment from 'moment';
import Problem from '@/components/problem/Problem';
import ErrorNotification from '@/components/common/ErrorNotification';
import Modal from '@/components/common/Modal';

import Tag from './Tag';

export default {
  name: 'Contest',
  data() {
    return {
      showDescription: false,
      showRankingModal: false,
      showSubmitListModal: false,
      activeTab: 0,
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
      'error',
    ]),
  },
  created() {
    this.activeTab = this.$route.hash ? this.$route.hash.charCodeAt(1) - 97 : 0;
    this.getContest(this.$route.params.id);
  },
  beforeDestroy() {
    this.setRequiredWatching(false);
  },
  methods: {
    ...mapActions('koneko/contests', [
      'getContest',
    ]),
    ...mapMutations('koneko/contests', [
      'setRequiredWatching',
    ]),
    toggleDescription() {
      this.showDescription = !this.showDescription;
    },
    showSubmitList() {
      this.showSubmitListModal = true;
    },
    showRanking() {
      this.showRankingModal = true;
    },
    num2alpha(num) {
      return String.fromCharCode(97 + num);
    },
    formatDate(date) {
      return moment(date)
        .locale('ja')
        .format('YYYY/MM/DD(ddd) HH:mm')
      ;
    },
  },
  components: {
    Tag,
    Modal,
    Problem,
    ErrorNotification,
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
</style>
