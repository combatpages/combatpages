import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import VisitsView from '../views/VisitsView.vue';
import AboutView from '../views/AboutView.vue';
import GymsView from '../views/GymsView.vue';
import EventsView from '../views/EventsView.vue';
import LearnView from '../views/LearnView.vue';
import EditorView from '../views/EditorView.vue';
import EditorGymsView from '../views/EditorGymsView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/index.html',
    name: 'index',
    component: HomeView
  },
  {
    path: '/visits',
    name: 'visits',
    component: VisitsView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/gyms',
    name: 'gyms',
    component: GymsView
  },
  {
    path: '/events',
    name: 'events',
    component: EventsView
  },
  {
    path: '/learn',
    name: 'learn',
    component: LearnView
  },
  {
    path: '/editor',
    name: 'editor',
    component: EditorView,
    children: [
      {
        path: 'gyms',
        name: 'editor-gyms',
        component: EditorGymsView
      },
      {
        path: ':pathMatch(.*)*',
        name: 'editor-child-fallback',
        component: { template: '' }
      }
    ]
  },
  {
    path: '/404',
    name: 'not-found',
    component: NotFoundView
  },
  { path: '/:catchAll(.*)', 
    name: 'not-found',
    component: NotFoundView
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;