<script setup>
const apiKey = 'af1e1c8f8ad6efb5b326eabaffa38b8a';
const url =
  'https://api.themoviedb.org/3/search/movie?api_key=' +
  apiKey +
  '&language=fr-FR&page=1&query=';

import { reactive, onMounted } from 'vue';
import Film from '../film.js';

const listeFilms = reactive([]);

function getFilms() {
  const fetchOptions = { method: 'GET' };
  fetch(url + 'Jardin', fetchOptions)
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

onMounted(() => {
  getFilms();
});


</script>
<template>
 
  <h3>Liste des films</h3>
  <ul>
    <li v-for="(film, index) in listeFilms" :key="index">
      {{film.titre}}
    </li>
    </ul>
</template>
