<template>
    <div class="container mx-auto pt-10">
      <div class="p-4">
        <h1 class="text-3xl font-bold text-yellow-600">Latest Movies</h1>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 p-6">
        <div
          v-for="movie in movies"
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
            Release date: {{ movie.year }}
          </div>
          <div
            class="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
          >
            <div class="text-white text-center gap-3">
        
              <h3 class="text-lg font-roboto ">{{ movie.title }}</h3>
              <p class="text-sm ">Year: {{ movie.year }}</p>
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
  
  const movies = ref([]);
  const router = useRouter();
  
  const fetchMovies = async () => {
    try {
      const response = await fetch('https://yts.mx/api/v2/list_movies.json');
      const data = await response.json();
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
  
      movies.value = data.data.movies
        .filter(movie => {
          const uploadDate = new Date(movie.date_uploaded_unix * 1000);
          return movie.year === currentYear && uploadDate.getFullYear() === currentYear && uploadDate.getMonth() === currentMonth;
        })
        .sort((a, b) => b.date_uploaded_unix - a.date_uploaded_unix);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  
  onMounted(fetchMovies);
  
  const goToMovieDetails = (id) => {
    router.push({ name: 'movie-detail', params: { id } });
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  