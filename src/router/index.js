import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ViewMovie from '../views/ViewMovie.vue';
import AllMovie from '../views/ViewAllMovie.vue'; 
import SearchResults from '../views/SearchResults.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/movies/:id',
    name: 'movie-detail',
    component: ViewMovie,
    props: true, 
  },
  {
    path: '/all-movies',
    name: 'all-movies',
    component: AllMovie,
  },
  {
     path: '/search-results',
      name: 'SearchResults',
      component: SearchResults, 
      props: true,
   },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
