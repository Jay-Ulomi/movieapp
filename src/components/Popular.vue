<template>
    <div class="container mx-auto pt-10">
      <div class="p-4">
        <h1 class="text-3xl font-bold text-yellow-600">Popular Movies</h1>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 p-6">
        <div
          v-for="movie in popularMovies"
          :key="movie.id" 
          @click="goToMovieDetails(movie.id)"
          class="relative bg-gray-100 rounded-lg shadow-md overflow-hidden 
          transform hover:-translate-y-2 hover:border-yellow-400 hover:shadow-lg transition duration-300 cursor-pointer"
        >
          <img
            :src="movie.medium_cover_image"
            :alt="movie.title"
            class="w-full h-100 object-cover transform hover:scale-105 transition duration-300"
          />
          <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-center text-white p-2">
            {{ movie.title }}
          </div>
          <div
            class="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
          >
            <div class="text-white text-center">
              <h3 class="text-lg font-roboto">{{ movie.title }}</h3>
              <p class="text-sm">Year: {{ movie.year }}</p>
              <p class="text-sm">Rating: {{ movie.rating }}</p>
              <p class="text-sm">Genres: {{ movie.genres.join(', ') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const popularMovies = ref([]);
  const router = useRouter();
  
  const fetchPopularMovies = async () => {
    try {
      const response = await fetch('https://yts.mx/api/v2/list_movies.json?sort_by=download_count&limit=8');
      const data = await response.json();
      popularMovies.value = data.data.movies;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };
  
  onMounted(fetchPopularMovies);
  
  const goToMovieDetails = (id) => {
    router.push({ name: 'movie-detail', params: { id } });
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  