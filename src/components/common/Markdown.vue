<template>
  <div v-html="this.compiledMarkdown" class="markdown-body" :id="id"></div>
</template>

<script>
import uuidv4 from 'uuid/v4';
import renderer from './renderer';

export default {
  name: 'Markdown',
  data() {
    return {
      mathJax: null,
      id: null,
    };
  },
  created() {
    this.id = uuidv4();
  },
  computed: {
    compiledMarkdown() {
      return renderer.render(this.body);
    },
  },
  props: {
    body: {
      type: String,
      required: true,
    },
  },
  watch: {
    compiledMarkdown() {
      this.$nextTick(() => {
        if (window.MathJax) {
          window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, this.id]);
        }
      });
    },
  },
  head: {
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML',
      },
    ],
  },
};
</script>

<style src="github-markdown-css/github-markdown.css"/>
