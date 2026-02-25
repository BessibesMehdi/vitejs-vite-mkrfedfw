<script setup>
import { reactive, watch } from 'vue';
import Film from '../film.js';

const props = defineProps(["idFilm"]);
const apiKey = 'af1e1c8f8ad6efb5b326eabaffa38b8a';

let state = reactive({
    film: null,
    loading: false,
    error: null
});

function getFilmDetail(id) {
    if (!id) return;

    state.loading = true;
    state.error = null;
    state.film = null;

    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=fr-FR`;

    fetch(url)
        .then(response => {
            console.log("Réponse API détails reçue, status:", response.status);
            if (!response.ok) throw new Error('Erreur lors de la récupération des détails');
            return response.json();
        })
        .then(data => {
            console.log("Données film reçues:", data.title);
            // On crée un nouveau Film (au sens POO) et on le stocke dans le state
            state.film = new Film(data);
            state.loading = false;
        })
        .catch(err => {
            console.error("Erreur API détails:", err);
            state.error = err.message;
            state.loading = false;
        });
}

watch(() => props.idFilm, (newId) => {
    getFilmDetail(newId);
}, { immediate: true });

</script>

<template>
    <div class="film-detail-container">
        <div v-if="state.loading" class="status">Chargement...</div>
        <div v-else-if="state.error" class="status error">{{ state.error }}</div>
        <div v-else-if="state.film" class="content">
            <!-- Affichage de toutes les infos présentes dans la classe Film -->
            <h2>{{ state.film.titre }}</h2>
            <p v-if="state.film.titreOriginal"><strong>Titre Original:</strong> {{ state.film.titreOriginal }}</p>
            <p><strong>ID:</strong> {{ state.film.id }}</p>

            <div class="images" v-if="state.film.affiche || state.film.afficheFond">
                <img v-if="state.film.affiche" :src="'https://image.tmdb.org/t/p/w200/' + state.film.affiche"
                    alt="Affiche" class="poster" />
            </div>

            <div class="info">
                <p><strong>Genres:</strong> {{ state.film.genres }}</p>
                <p><strong>Résumé:</strong></p>
                <p class="resume">{{ state.film.resume }}</p>
            </div>
        </div>
        <div v-else class="status">
            Sélectionnez un film pour voir son détail.
        </div>
    </div>
</template>

<style scoped>
</style>