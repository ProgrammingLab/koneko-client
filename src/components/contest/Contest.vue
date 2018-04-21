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
                  <button class="button is-outlined" href="#">
                    提出一覧
                  </button>
                  <button class="button is-outlined" href="#">
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
              <li>
                <a href="#a" class="tab-button active-tab-button">
                  A
                  <tag :status="0"/>
                </a>
              </li>
              <li>
                <a href="#b" class="tab-button">
                  B
                  <tag :status="1"/>
                </a>
              </li>
              <li>
                <a href="#c" class="tab-button">
                  C
                  <tag :status="2"/>
                </a>
              </li>
              <li>
                <a href="#d" class="tab-button">
                  D
                  <tag :status="3"/>
                </a>
              </li>
              <li>
                <a href="#e" class="tab-button">
                  E
                  <tag :status="4"/>
                </a>
              </li>
              <li>
                <a href="#e" class="tab-button">
                  F
                  <tag :status="5"/>
                </a>
              </li>
              <li>
                <a href="#e" class="tab-button">
                  G
                  <tag :status="6"/>
                </a>
              </li>
              <li>
                <a href="#e" class="tab-button">
                  H
                  <tag :status="7"/>
                </a>
              </li>
              <li>
                <a href="#e" class="tab-button">
                  I
                  <tag :status="8"/>
                </a>
              </li>
              <li>
                <a href="#e" class="tab-button">
                  J
                  <tag :status="9"/>
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
    };
  },
  methods: {
    toggleDescription() {
      this.showDescription = !this.showDescription;
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
