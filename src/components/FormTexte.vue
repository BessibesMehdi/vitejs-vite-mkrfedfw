<script setup>
import { ref } from 'vue';

const emit = defineEmits(['search']);
const critere = ref('');

function handlerAdd() {
  emit('search', critere.value);
}
</script>

<template>
  <form @submit.prevent="handlerAdd">
    <input type="text" v-model="critere" placeholder="Rechercher un film" />
    <button type="submit">Rechercher</button>
  </form>
</template>

<style scoped>
</style>
