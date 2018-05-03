<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background" style="background-color: gray;opacity:0.5;"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Information</p>
        <button class="delete" aria-label="close" @click="closeInformationModel"></button>
      </header>
      <section class="modal-card-body">
        {{ body }}
      </section>
      <footer class="modal-card-foot">
        <button class="button" @click="closeInformationModel">OK</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'InformationModal',
  computed: {
    ...mapState('koneko/informationModal', [
      'isActive',
      'body',
    ]),
  },
  methods: {
    ...mapActions('koneko/informationModal', [
      'closeInformationModel',
    ]),
  },
};
</script>

<style scoped>
</style>

