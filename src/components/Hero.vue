<template>
    <div class="pt-5">
      <div class="max-w-full mx-auto">
        <div class="relative overflow-hidden">
          <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentIndex * slideWidth}%)` }">
            <div
              v-for="(movie, index) in recentMovies"
              :key="movie.id"
              class="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2"
            >
              <div class="flex flex-col items-center gap-2">
                <img :src="movie.medium_cover_image" :alt="movie.title" class="w-full rounded-lg shadow-lg" />
               
              </div>
            </div>
          </div>
          <button @click="prevSlide" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-yellow-600 text-white p-2 rounded-full focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button @click="nextSlide" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-yellow-600 text-white p-2 rounded-full focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, watch } from 'vue';
  
  const recentMovies = ref([]);
  const currentIndex = ref(0);
  const slideWidth = ref(100 / 2); 
  
  async function fetchRecentMovies() {
    try {
      const response = await fetch('https://yts.mx/api/v2/list_movies.json?sort_by=year');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      recentMovies.value = data.data.movies;
    } catch (error) {
      console.error('Error fetching recent movies:', error);
    }
  }
  
  function nextSlide() {
    if (recentMovies.value.length > 6) {
      const maxIndex = Math.ceil(recentMovies.value.length / (6 / (100 / slideWidth.value))) - 1;
      currentIndex.value = (currentIndex.value + 1) % (maxIndex + 1);
    }
  }
  
  function prevSlide() {
    if (recentMovies.value.length > 6) {
      const maxIndex = Math.ceil(recentMovies.value.length / (6 / (100 / slideWidth.value))) - 1;
      currentIndex.value = (currentIndex.value - 1 + (maxIndex + 1)) % (maxIndex + 1);
    }
  }
  
  // Update slideWidth on window resize
  function updateSlideWidth() {
    if (window.innerWidth >= 1024) {
      slideWidth.value = 100 / 6; 
      slideWidth.value = 100 / 3; 
    } else {
      slideWidth.value = 100 / 2; 
    }
  }
  
  onMounted(() => {
    fetchRecentMovies();
    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
  });
  
  watch(slideWidth, updateSlideWidth); // Watch for changes in slideWidth
  
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  