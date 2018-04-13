<template>
  <div v-html="this.compiledMarkdown" class="markdown-body"></div>
</template>

<script>
import renderer from './renderer';

export default {
  name: 'Markdown',
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
