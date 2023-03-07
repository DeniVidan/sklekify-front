import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'
import UserProfile from '../views/UserProfile.vue'
import UserWorkout from '../views/UserWorkout.vue'
import UserProgress from '../views/UserProgress.vue'
import { Auth } from '@/services/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/workouts',
    name: 'UserWorkout',
    component: UserWorkout
  },
  {
    path: '/progress',
    name: 'UserProgress',
    component: UserProgress
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  const publicSite = ["/signin", "/signup"]
  const loginRequired = !publicSite.includes(to.path)
  const user = Auth.getUser()


  if (!user && loginRequired) {
    next('/signin');
    return;
  }
  
  next();

})

export default router
