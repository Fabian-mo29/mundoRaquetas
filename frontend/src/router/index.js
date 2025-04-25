import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LogInView from '@/views/LogInView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import ShoppingCartView from '@/views/ShoppingCartView.vue';
import CategoryView from '@/views/CategoryView.vue';
import CategoryMenView from '@/views/CategoryMenView.vue';
import CategoryWomenView from '@/views/CategoryWomenView.vue';
import CategoryKidsView from '@/views/CategoryKidsView.vue';
import CategoryAccessoriesView from '@/views/CategoryAccessoriesView.vue';
import CategoryDiscountsView from '@/views/CategoryDiscountsView.vue';

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
    {
      path: "/category/",
      name: "Category",
      component: CategoryView,
    },
    {
      path: "/category/men",
      name: "CategoryMen",
      component: CategoryMenView,
    },
    {
      path: "/category/women",
      name: "CategoryWomen",
      component: CategoryWomenView,
    },
    {
      path: "/category/kids",
      name: "CategoryKids",
      component: CategoryKidsView,
    },
    {
      path: "/category/accessories",
      name: "CategoryAccessories",
      component: CategoryAccessoriesView,
    },
    {
      path: "/category/ofertas",
      name: "CategoryOfertas",
      component: CategoryDiscountsView,
    },
  ],
});

export default router;
