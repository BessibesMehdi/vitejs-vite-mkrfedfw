<script setup>
// La clé secrète pour se connecter à la base de données de films TMDB
const apiKey = 'af1e1c8f8ad6efb5b326eabaffa38b8a';

// L'adresse de base pour faire une recherche de film
const url =
  'https://api.themoviedb.org/3/search/movie?api_key=' +
  apiKey +
  '&language=fr-FR&page=1&query=';

// On importe les outils de Vue
import { reactive, onMounted, watch, ref } from 'vue';
import Film from '../film.js';

// On crée une liste vide qui contiendra nos films (tableau réactif)
const listeFilms = reactive([]);

// On définit les propriétés que ce composant reçoit (le critère de recherche)
const props = defineProps(["critere"])
const motcle = ref(props.critere);

// Fonction principale qui va chercher les films sur Internet
function getFilms() {
  if (!motcle.value) return; // Si rien n'est tapé, on ne fait rien

  listeFilms.splice(0, listeFilms.length); // On vide la liste actuelle avant d'en charger de nouveaux

  const fetchOptions = { method: 'GET' };

  // On appelle l'API TMDB avec notre mot-clé
  fetch(url + motcle.value, fetchOptions)
    .then((response) => {
      return response.json(); // On transforme la réponse brute en format JSON (facile à lire pour JS)
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // On parcourt chaque résultat reçu
      dataJSON.results.forEach((film) => {
        // Pour chaque film, on utilise notre moule "Film" pour créer un bel objet
        // C'est ce qu'on appelle la Programmation Orientée Objet (POO)
        listeFilms.push(new Film(film));
      });
    })
    .catch((error) => {
      console.error(error); // Si ça plante, on l'affiche dans la console
    });
}

// Si le mot-clé change (l'utilisateur tape une nouvelle recherche)
watch(props, (newProps) => {
  motcle.value = newProps.critere;
  console.log(motcle.value);
  getFilms(); // On relance la recherche
});

// Quand le composant apparaît pour la première fois à l'écran
onMounted(() => {
  getFilms();
});

// On prépare l'événement "eventChoix" pour dire au parent quel film a été cliqué
const emit = defineEmits(["eventChoix"]);

// Fonction appelée quand on clique sur le bouton titre d'un film
function selectFilm(id) {
  console.log("Film sélectionné dans AffichListFilms, ID:", id);
  emit("eventChoix", id); // On envoie l'ID au composant Films.vue
}

</script>

<template>
  <h3>Liste des films</h3>
  <div class="films-container">
    <!-- Pour chaque film dans notre liste, on crée un petit bloc visuel -->
    <div v-for="film in listeFilms" :key="film.id" class="film-item">
      <!-- Image de l'affiche -->
      <img class="image" :src="'https://image.tmdb.org/t/p/w500/' + film.affiche" />

      <!-- Bouton du titre. Au clic, on utilise $emit pour envoyer l'ID directement -->
      <p><button @click="$emit('eventChoix', film.id)">{{ film.titre }}</button></p>

    </div>
  </div>
</template>

<style scoped>
/* Styles pour la grille de films */
.films-container {
  display: flex;
  flex-wrap: wrap;
  /* Revient à la ligne si pas assez de place */
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
  object-fit: cover;
  border-radius: 4px;
}
</style>
