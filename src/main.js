import './assets/styles/main.css';
import 'highlight.js/styles/github.css';

import { createApp } from 'vue';
import App from './App.vue';
import hljs from 'highlight.js';

const app = createApp(App);

app.directive('highlight', function (el) {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightElement(block);
  });
});
app.mount('#app');
