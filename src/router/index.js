import { createRouter, createWebHistory } from 'vue-router'
import FruitList from '../views/FruitList.vue'
import FruitDetails from '../views/FruitDetails.vue'

const routes = [
  {
    path: '/',
    name: 'FruitList',
    component: FruitList,
  },
  {
    path: '/fruit/:id',
    name: 'FruitDetails',
    props: true,
    component: FruitDetails,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
