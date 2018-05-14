<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card" :class="{wide: isWide}">
      <header class="modal-card-head">
        <p class="modal-card-title">{{title}}</p>
        <button class="delete" aria-label="close" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot"></footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    title: String,
    isActive: Boolean,
    isWide: Boolean,
  },
};
</script>
<style scoped>
  .wide{
    width: 90%;
  }
</style>
