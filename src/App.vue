<script setup>
import { onMounted, ref } from 'vue';
import { marked } from 'marked';

const content = ref('');
const docs = '../index.md';

async function getDocs() {
  const res = await fetch(docs);
  const text = await res.text();
  content.value = marked(text);
}

onMounted(() => {
  getDocs();
});
</script>

<template>
  <div v-html="content" v-highlight class="prose"></div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
