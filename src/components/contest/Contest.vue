<template>
  <div>
    <div class="container margin-bottom">
      <section class="hero is-small is-light">
        <div class="hero-body">
          <nav class="navbar">
            <div class="navbar-brand">
              <div>
                <h1 class="title">未実装ガバガバコンテスト</h1>
                <h2 class="subtitle is-6">完成予定: 2018/4/18~2018/5/18</h2>
              </div>
            </div>
            <div class="navbar-menu">
              <div class="navbar-end">
                <span class="navbar-item">
                  <button class="button is-outlined">
                    提出一覧
                  </button>
                  <button class="button is-outlined">
                    順位
                  </button>
                </span>
              </div>
            </div>
          </nav>
        </div>
      </section>
      <article class="message is-light">
        <div class="message-header">
          <a  @click="toggleDescription">{{ showDescription ? "閉じる" : "詳細" }}</a>
        </div>
        <div class="message-body" v-show="showDescription">
          <p>
            福さんの実装の遅さのために進捗が全く出ていないこと<br>
            昨日、commit0回,push0回であったことをここに謝罪します。
          </p>
        </div>
      </article>
    </div>
    <div class="container">
      <div class="columns">
        <div class="column is-1 tab">
          <aside>
            <ul class="menu-list">
              <li v-for="(status, index) in problemStatus" :key="index">
                <a
                  :href= "'#' + num2alpha(index)"
                  :class= "['tab-button',index == activeTab ? 'active-tab-button': '']"
                  @click="activeTab = index"
                >
                  {{ num2alpha(index).toUpperCase() }}
                  <tag :status="status"/>
                </a>
              </li>
            </ul>
          </aside>
        </div>
        <div class="column">
          <Problem/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Problem from '@/components/common/Problem';
import Tag from './Tag';

export default {
  name: 'Contest',
  data() {
    return {
      showDescription: false,
      activeTab: 0,
      problemStatus: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    };
  },
  methods: {
    toggleDescription() {
      this.showDescription = !this.showDescription;
    },
    num2alpha(num) {
      return String.fromCharCode(97 + num);
    },
  },
  components: {
    Tag,
    Problem,
  },
};
</script>

<style scoped>
  .tab {
    padding-right: 0;
    border-right: 5px solid hsl(204, 86%, 53%);
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
