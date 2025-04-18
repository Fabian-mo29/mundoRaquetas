import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LogInView from '@/views/LogInView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import ShoppingCartView from '@/views/ShoppingCartView.vue';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
    },
    {
      path: "/logIn",
      name: "LogIn",
      component: LogInView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: "NotFound",
      component: NotFoundView,
    },
    {
      path: "/shoppingCart",
      name: "ShoppingCart",
      component: ShoppingCartView,
    },
  ],
});

export default router;
