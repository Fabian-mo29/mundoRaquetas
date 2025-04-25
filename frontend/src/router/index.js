import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LogInView from "@/views/LogInView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ShoppingCartView from "@/views/ShoppingCartView.vue";
import ProductDetailsView from "@/views/ProductDetailsView.vue";
import ProductOfertasView from "@/views/ProductOfertasView.vue";

const router = createRouter({
  history: createWebHistory("/"),
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
      path: "/shoppingCart",
      name: "ShoppingCart",
      component: ShoppingCartView,
    },
    {
      path: "/product/:id",
      name: "Product",
      component: ProductDetailsView,
      props: (route) => ({ productId: Number(route.params.id) }),
    },
    {
      path: "/oferta/:id",
      name: "Oferta",
      component: ProductOfertasView,
      props: (route) => ({ ofertaId: Number(route.params.id) }),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundView,
    },
  ],
});

export default router;
