<template>
  <section class="section">
    <button v-on:click="onRefresh" class="button">
      再読み込み(デバッグ用)
    </button>
    <h1 class="title">
      ワーカーステータス
    </h1>
    <div class="columns scrollable">
      <div v-for="worker in workers" :key="worker.worker_id" class="column is-4">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              <span v-if="worker.is_busy" class="tag is-warning">Busy</span>
              <span v-else class="tag is-info">Idle</span>
              {{ worker.worker_id }}
            </p>
          </header>
          <div class="card-content">
            <div>
              Job Name: {{ worker.job_name }}
            </div>
            <div>
              Job ID: {{ worker.job_ID }}
            </div>
            <div>
              Started at: {{ worker.started_at }}
            </div>
            <div>
              Args: {{ worker.args_json }}
            </div>
            <div>
              Checkin: {{ worker.checkin }}
            </div>
            <div>
              Checkin at: {{ worker.checkin_at }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'WorkerDashboard',
  created() {
    this.getWorkers({ sessionID: this.sessionID });
  },
  computed: {
    ...mapState('auth', ['sessionID']),
    ...mapState('dashboard', ['workers']),
  },
  methods: {
    ...mapActions('dashboard', ['getWorkers']),
    onRefresh() {
      this.getWorkers({ sessionID: this.sessionID });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scrollable{
  overflow-x: scroll;
}
</style>
