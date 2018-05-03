<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background" style="background-color: gray;opacity:0.5;"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Are you sure?</p>
        <button class="delete" aria-label="close" @click="onClickCancel"></button>
      </header>
      <section class="modal-card-body">
        {{ body }}
      </section>
      <footer class="modal-card-foot">
        <div class="columns">
          <div class="column">
            <button class="button" @click="onClickCancel">Cancel</button>
          </div>
          <div class="column">
            <button class="button is-danger" @click="onClickDelete">Delete</button>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'DeleteConfirmationModal',
  computed: {
    ...mapState('koneko/deleteConfirmationModal', [
      'isActive',
      'body',
      'argument',
    ]),
  },
  methods: {
    ...mapActions('koneko/deleteConfirmationModal', [
      'closeDeleteConfirmationModal',
    ]),
    onClickDelete() {
      this.$emit('onClickDelete', this.argument);
      this.closeDeleteConfirmationModal();
    },
    onClickCancel() {
      this.$emit('onClickCancel', this.argument);
      this.closeDeleteConfirmationModal();
    },
  },
};
</script>
