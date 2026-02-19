<script setup>
import { ref } from 'vue';
import AffichListFilms from './AffichListFilms.vue';
import FormTexte from './FormTexte.vue';

const motcle = ref('');

function handlerSearch(nouveluMotCle) {
  motcle.value = nouveluMotCle;
}
</script>

<template>
  <h2>Films</h2>
  <!-- je dois tjrs appeler la vue que j'importe sinon elle s'affiche pas  -->
  <FormTexte @search="handlerSearch"></FormTexte>
  <AffichListFilms :critere="motcle"></AffichListFilms>
</template>
