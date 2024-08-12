<template>
    <div class="bg-blue-950 text-center py-10">
        <div class="max-w-2xl mx-auto text-white flex gap-4 items-center">
          <div class="mb-4">
            <label for="quality" class="block">Quality:</label>
            <select id="quality" v-model="filters.quality" class="bg-gray-800 text-white px-4 py-2 rounded">
              <option value="">All</option>
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
              <option value="2160p">2160p</option>
              <option value="3D">3D</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="genre" class="block">Genre:</label>
            <select id="genre" v-model="filters.genre" class="bg-gray-800 text-white px-4 py-2 rounded">
              <option value="">All</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <!-- Add more genres as needed -->
            </select>
          </div>
          <div class="mb-4">
            <label for="rating" class="block">Rating:</label>
            <select id="rating" v-model="filters.rating" class="bg-gray-800 text-white px-4 py-2 rounded">
              <option value="">All</option>
              <option value="7">7+</option>
              <option value="8">8+</option>
              <option value="9">9+</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="year" class="block">Year:</label>
            <select id="year" v-model="filters.year" class="bg-gray-800 text-white px-4 py-2 rounded">
              <option value="">All</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="language" class="block">Language:</label>
            <select id="language" v-model="filters.language" class="bg-gray-800 text-white px-4 py-2 rounded">
              <option value="">All</option>
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
              <!-- Add more languages as needed -->
            </select>
          </div>
          <button @click="applyFilters" class="bg-yellow-600 text-white px-4 py-2 rounded ml-auto w-60 h-10 text-center">Apply</button>
        </div>
      </div>
      
      <div class="container mx-auto pt-10">
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 p-6">
          <div
            v-for="movie in paginatedMovies"
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
          </div>
        </div>
      </div>
  
      <div class="flex justify-center mt-4">
        <button
          :disabled="currentPage === 1"
          @click="prevPage"
          class="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 mx-1 rounded"
        >Previous</button>
        <button
          :disabled="currentPage === totalPages"
          @click="nextPage"
          class="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 mx-1 rounded"
        >Next</button>
      </div>
   
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  const popularMovies = ref([]);
  const filteredMovies = ref([]);
  const router = useRouter();
  const filters = ref({
    quality: '',
    genre: '',
    rating: '',
    year: '',
    language: '',
    order: 'download_count',
  });
  
  const currentPage = ref(1);
  const itemsPerPage = 12;
  
  const fetchPopularMovies = async () => {
    try {
      const response = await fetch('https://yts.mx/api/v2/list_movies.json');
      const data = await response.json();
      popularMovies.value = data.data.movies;
      filteredMovies.value = popularMovies.value;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };
  
  onMounted(fetchPopularMovies);
  
  const applyFilters = () => {
    let filtered = popularMovies.value;
  
    if (filters.value.quality) {
      filtered = filtered.filter(movie => movie.torrents.some(torrent => torrent.quality === filters.value.quality));
    }
    if (filters.value.genre) {
      filtered = filtered.filter(movie => movie.genres.includes(filters.value.genre));
    }
    if (filters.value.rating) {
      filtered = filtered.filter(movie => movie.rating >= filters.value.rating);
    }
    if (filters.value.year) {
      filtered = filtered.filter(movie => movie.year === Number(filters.value.year));
    }
    if (filters.value.language) {
      filtered = filtered.filter(movie => movie.language === filters.value.language);
    }
    
    filtered.sort((a, b) => {
      if (filters.value.order === 'download_count') {
        return b.download_count - a.download_count;
      } else if (filters.value.order === 'rating') {
        return b.rating - a.rating;
      } else if (filters.value.order === 'year') {
        return b.year - a.year;
      }
    });
  
    filteredMovies.value = filtered;
    currentPage.value = 1;
  };
  
  const paginatedMovies = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredMovies.value.slice(start, end);
  });
  
  const totalPages = computed(() => {
    return Math.ceil(filteredMovies.value.length / itemsPerPage);
  });
  
  const goToMovieDetails = (id) => {
    router.push({ name: 'movie-detail', params: { id } });
  };
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  