<template>
    <div class="bg-blue-950 text-center py-24">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-4xl font-bold mb-4">Search Results</h1>
        <div v-if="movies.length">
          <div v-for="(movie, index) in movies" :key="index" class="mb-4">
            <img :src="movie.medium_cover_image" :alt="movie.title" class="w-full rounded-lg shadow-lg" />
            <h2 class="text-xl font-semibold mt-4">{{ movie.title }}</h2>
            <p class="text-sm text-gray-300">{{ movie.year }}</p>
          </div>
        </div>
        <p v-else class="text-lg">No movies found.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const movies = ref([]);
  
  onMounted(() => {
    if (route.params.movies) {
      movies.value = JSON.parse(route.params.movies);
    }
  });
  </script>
  