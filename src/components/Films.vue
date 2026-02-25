<script setup>
// Importations nécessaires
import { ref } from 'vue';
import AffichListFilms from './AffichListFilms.vue'; // La liste des résultats
import FormTexte from './FormTexte.vue';           // La barre de recherche

// On définit le mot-clé de recherche (vide au début)
const motcle = ref('');

// On prépare le composant à pouvoir envoyer un événement "eventFilmChoisi" vers son parent (App.vue)
const emit = defineEmits(["eventFilmChoisi"]);

// Cette fonction reçoit le mot-clé tapé par l'utilisateur (depuis FormTexte)
function handlerSearch(nouveluMotCle) {
  motcle.value = nouveluMotCle;
}

// Cette fonction reçoit l'identifiant du film cliqué (depuis AffichListFilms)
// Elle sert de "pont" : elle reçoit l'info et la renvoie immédiatement à App.vue
function handlerIdFilm(id) {
  console.log("Film sélectionné dans Films (bubbling), ID:", id);
  emit("eventFilmChoisi", id); // On fait "remonter" l'info
}
</script>

<template>
  <h2>Films</h2>
  <!-- Barre de recherche : elle envoie "search" quand l'utilisateur valide -->
  <FormTexte @search="handlerSearch"></FormTexte>

  <!-- Affichage de la liste : 
       1. On lui donne le mot-clé à chercher (:critere)
       2. On écoute s'il nous dit qu'un film a été choisi (@eventChoix) -->
  <AffichListFilms :critere="motcle" @eventChoix="handlerIdFilm"></AffichListFilms>
</template>
