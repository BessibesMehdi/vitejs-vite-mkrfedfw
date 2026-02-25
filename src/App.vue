<script setup>
// On importe les outils de Vue dont on a besoin
import { ref } from 'vue';

// On importe nos composants (les morceaux de notre interface)
import Films from './components/Films.vue';
import FilmDetail from './components/FilmDetail.vue';
import FilmActeurs from './components/FilmActeurs.vue';

// On crée une variable réactive "idFilm" qui retiendra l'identifiant du film choisi.
// On l'initialise à 0 (aucun film au début).
const idFilm = ref(0);

// Cette fonction est appelée quand on reçoit l'événement "eventFilmChoisi" du composant Films.
// Elle reçoit l'identifiant (id) et met à jour notre variable "idFilm".
function handlerChoix(id) {
  console.log("Film sélectionné dans App, ID:", id);
  idFilm.value = id;
}
</script>

<template>
  <!-- Le conteneur principal qui utilise Flexbox pour faire des colonnes -->
  <div class="container">

    <!-- Colonne 1 : Elle contient tout ce qui concerne la recherche et la liste des films -->
    <div class="column-1">
      <Films @eventFilmChoisi="handlerChoix"></Films>
    </div>

    <!-- Colonne 2 : Elle affiche les détails du film sélectionné -->
    <div class="column-2">
      <h3>Détails</h3>
      <!-- On passe l'identifiant du film au composant FilmDetail via une "props" :idFilm -->
      <FilmDetail :idFilm="idFilm" />
      <!-- Petit message si aucun film n'est encore sélectionné -->
      <p v-if="idFilm === 0">Sélectionnez un film pour voir les détails</p>
    </div>

    <!-- Colonne 3 : Elle affiche la liste des acteurs du film sélectionné -->
    <div class="column-3">
      <FilmActeurs :idFilm="idFilm" />
    </div>

  </div>
</template>

<style scoped>
/* Mise en page globale de l'application */
.container {
  display: flex;
  /* Active le mode colonnes */
  width: 100%;
  gap: 20px;
  /* Espace entre les colonnes */
}

/* Style commun pour nos 3 colonnes (couleurs sombres demandées) */
.column-1 {
  width: 35%;
  padding: 10px;
  border: 1px solid #383737;
  border-radius: 8px;
  background-color: #161616;
}

.column-2 {
  width: 25%;
  padding: 10px;
  border: 1px solid #2c2b2b;
  border-radius: 8px;
  background-color: #1b1a1a;
}

.column-3 {
  width: 30%;
  padding: 10px;
  border: 1px solid #242323;
  border-radius: 8px;
  background-color: #201f1f;
}
</style>
