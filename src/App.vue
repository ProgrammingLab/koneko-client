<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/common/Header';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style>
body {
  font-family: 'Noto Sans JP', sans-serif;
}
</style>
