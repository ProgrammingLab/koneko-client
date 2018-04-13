import Markdown from 'markdown-it';
import Mathjax from 'markdown-it-mathjax';

const md = new Markdown().use(Mathjax());

export default {
  render(body) {
    return md.render(body);
  },
};
