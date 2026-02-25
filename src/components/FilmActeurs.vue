<script setup>
import { reactive, watch } from 'vue';
import { Acteur } from '../acteur.js';

const props = defineProps(["idFilm"]);
const apiKey = 'af1e1c8f8ad6efb5b326eabaffa38b8a';

let state = reactive({
    acteurs: [],
    loading: false,
    error: null
});

function getFilmActeurs(id) {
    if (!id || id === 0) {
        state.acteurs = [];
        return;
    }

    state.loading = true;
    state.error = null;
    state.acteurs = [];

    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=fr-FR`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Erreur lors de la récupération des acteurs');
            return response.json();
        })
        .then(data => {
            // On récupère les 15 premiers acteurs et on les transforme en objets Acteur (POO)
            state.acteurs = data.cast.slice(0, 15).map(a => new Acteur(a));
            state.loading = false;
        })
        .catch(err => {
            console.error("Erreur API acteurs:", err);
            state.error = err.message;
            state.loading = false;
        });
}

watch(() => props.idFilm, (newId) => {
    getFilmActeurs(newId);
}, { immediate: true });

</script>

<template>
    <div class="film-acteurs-container">
        <h3>Acteurs</h3>
        <div v-if="state.loading" class="status">Chargement des acteurs...</div>
        <div v-else-if="state.error" class="status error">{{ state.error }}</div>
        <div v-else-if="state.acteurs.length > 0" class="acteurs-list">
            <div v-for="acteur in state.acteurs" :key="acteur.id" class="acteur-item">
                <img v-if="acteur.photo" :src="'https://image.tmdb.org/t/p/w200/' + acteur.photo" :alt="acteur.nom"
                    class="profile-pic" />
                <div class="acteur-info">
                    <p class="name">{{ acteur.nom }}</p>
                </div>
            </div>
        </div>
        <div v-else class="status">
            Sélectionnez un film pour voir les acteurs.
        </div>
    </div>
</template>

<style scoped>
.film-acteurs-container {
    padding: 15px;
    background: #1a1a1a;
    border-radius: 8px;
    color: #eee;
}

.acteurs-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.acteur-item {
    display: flex;
    gap: 10px;
    align-items: center;
}

.profile-pic {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 50%;
}

.acteur-info .name {
    margin: 0;
    font-weight: bold;
    font-size: 0.95rem;
}

.status {
    text-align: center;
    color: #888;
    font-style: italic;
    padding: 10px;
}

.error {
    color: #e53e3e;
}
</style>
