import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue';
import VoterView from './views/VoterView.vue';
import AdminView from './views/AdminView.vue';

const routes = [
  {
    path: '/',
    component: LoginView,
  },
  {
    path: '/voter',
    component: VoterView,
  },
  {
    path: '/admin',
    component: AdminView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
