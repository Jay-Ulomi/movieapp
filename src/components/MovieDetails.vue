<template>
  <div class="container mx-auto pt-10" v-if="movie">
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/3 p-4">
        <img :src="movie.medium_cover_image" alt="Movie cover" class="w-full h-auto rounded-lg shadow-md" />
      </div>
      <div class="w-full md:w-2/3 p-4">
        <h1 class="text-3xl font-bold mb-4 text-center">{{ movie.title }}</h1>
        <p class="mb-4">{{ movie.description_full }}</p>
        <ul class="mb-4 space-y-4 pl-10">
          <li class="flex items-center"><strong>Rating:</strong><i class="fa fa-star text-yellow-400 ml-4" aria-hidden="true"></i><span class="ml-2">{{ movie.rating }}</span>/<small>10</small></li>
          <li class="flex items-center"><strong>Year:</strong><i class="fas fa-calendar-alt ml-4" aria-hidden="true"></i><span class="ml-2">{{ movie.year }}</span></li>
          <li class="flex items-center"><strong>Genre:</strong> <span class="ml-2">{{ movie.genres.join(', ') }}</span></li>
          <li class="flex items-center"><strong>Runtime:</strong> <span class="ml-2">{{ movie.runtime }} minutes</span></li>
        </ul>
        <div class="mt-8">
          <h2 class="text-2xl font-semibold mb-2">Download Links:</h2>
          <ul class="space-x-3 flex justify-center">
            <li v-for="torrent in movie.torrents" :key="torrent.hash" class="flex items-center">
              <a
                :href="torrent.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center bg-blue-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                <i class="fas fa-download mr-2" aria-hidden="true"></i>
                Download ({{ torrent.quality }} - {{ torrent.size }})
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <h2 class="text-2xl font-semibold mb-4 text-center">Related Movies</h2>
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 p-6">
        <div
          v-for="relatedMovie in relatedMovies" 
          :key="relatedMovie.id"
          @click="goToMovieDetails(relatedMovie.id)"
          class="relative bg-gray-100 rounded-lg shadow-md overflow-hidden 
          transform hover:-translate-y-2 hover:border-yellow-400 hover:shadow-lg transition duration-300 cursor-pointer"
        >
          <img
            :src="relatedMovie.medium_cover_image"
            :alt="relatedMovie.title"
            class="w-full h-100 object-cover transform hover:scale-105 transition duration-300"
          />
          <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-center text-white p-2">
            Release date: {{ relatedMovie.year }}
          </div>
          <div
            class="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
          >
            <div class="text-white text-center">
              <h3 class="text-lg font-roboto">{{ relatedMovie.title }}</h3>
              <p class="text-sm">Year: {{ relatedMovie.year }}</p>
              <p class="text-sm">Rating: {{ relatedMovie.rating }}</p>
              <p class="text-sm">Genres: {{ relatedMovie.genres.join(', ') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-10">
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const movie = ref(null);
const relatedMovies = ref([]);

const fetchMovieDetails = async () => {
  try {
    const movieId = route.params.id;
    const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`);
    const data = await response.json();
    movie.value = data.data.movie;

    // Fetch related movies
    const relatedResponse = await fetch(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movieId}`);
    const relatedData = await relatedResponse.json();
    relatedMovies.value = relatedData.data.movies;
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
};

const goToMovieDetails = (id) => {
  router.push({ name: 'movie-detail', params: { id } });
};

onMounted(fetchMovieDetails);
</script>
