import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import PartiesView from '../views/PartiesView.vue'
import VotesView from '../views/VotesView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/parties',
      name: 'parties',
      component: PartiesView
    },
    {
      path: '/votes',
      name: 'votes',
      component: VotesView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ],
  linkActiveClass: 'active'
})

export default router
