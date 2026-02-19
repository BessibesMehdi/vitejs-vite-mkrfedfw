<script setup>
const apiKey = 'af1e1c8f8ad6efb5b326eabaffa38b8a';
const url =
  'https://api.themoviedb.org/3/search/movie?api_key=' +
  apiKey +
  '&language=fr-FR&page=1&query=';

import { reactive, onMounted, watch, ref } from 'vue';
import Film from '../film.js';

const listeFilms = reactive([]);
const props = defineProps(["critere"])
const motcle = ref(props.critere);


function getFilms() {
  const fetchOptions = { method: 'GET' };
  fetch(url + motcle.value, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      dataJSON.results.forEach((film) => {
        // On crée une nouvelle Chose et on l'ajoute au tableau réactif il faut écrire tous les "attributs" sinon sur l'écran on aura que des undefined et faut pas oublier le JSON pour data
        listeFilms.push(new Film(film));
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

watch(props, (newProps) => {
  motcle.value = newProps.critere;
  console.log(motcle.value);
  getFilms();
});

onMounted(() => {
  getFilms();
});


</script>
<template>
  <h3>Liste des films</h3>
  <div class="films-container">
    <div v-for="film in listeFilms" :key="film.id" class="film-item">
      <img class="image" :src="'https://image.tmdb.org/t/p/w500/' + film.affiche" :alt="film.titre" />
      <div>{{ film.titre }}</div>
    </div>
  </div>
</template>

<style scoped>
.films-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.film-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
}
.image {
  width: 100px;
  height: 150px;
}
</style>
