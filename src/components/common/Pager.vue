<template>
  <nav class="pagination is-centered" role="navigation">
      <ul class="pagination-list">
        <li v-if="current > 2">
          <a @click="$emit('movePage', 1)" class="pagination-link">
            1
          </a>
        </li>
        <li v-if="current > 3">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li v-if="current !== 1">
          <a @click="$emit('movePage', current - 1)" class="pagination-link">
            {{current - 1}}
          </a>
        </li>
        <li>
          <a class="pagination-link is-current">
            {{current}}
          </a>
        </li>
        <li v-if="current !== length">
          <a @click="$emit('movePage', current + 1)" class="pagination-link">
            {{current + 1}}
          </a>
        </li>
        <li v-if="length > current + 2">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li v-if="length > current + 1">
          <a  @click="$emit('movePage', length)" class="pagination-link">
            {{length}}
          </a>
        </li>
      </ul>
    </nav>
</template>

<script>
export default {
  props: {
    length: Number,
    current: Number,
  },
};
</script>

<style lang="css">
</style>
