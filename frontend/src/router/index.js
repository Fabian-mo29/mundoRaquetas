import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LogInView from "@/views/LogInView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ShoppingCartView from "@/views/ShoppingCartView.vue";
import ProductDetailsView from "@/views/ProductDetailsView.vue";
import ProductOfertasView from "@/views/ProductOfertasView.vue";
import CategoryView from "@/views/CategoryView.vue";
import CategoryRacketsView from "@/views/CategoryRacketsView.vue";
import CategoryBallsView from "@/views/CategoryBallsView.vue";
import CategoryShoesView from "@/views/CategoryShoesView.vue";
import CategoryAccessoriesView from "@/views/CategoryAccessoriesView.vue";
import CategoryDiscountsView from "@/views/CategoryDiscountsView.vue";
import ProductSearchView from "@/views/ProductSearchView.vue";
import ContactUsView from "@/views/ContactUsView.vue";
import RequestWarrantyView from "@/views/RequestWarrantyView.vue";
import TrackOrderView from "@/views/TrackOrderView.vue";
import UserViewView from "@/views/UserViewView.vue";
import PhysicalStoreView from "@/views/PhysicalStoreView.vue";
import TermsAndConditionsView from "@/views/TermsAndConditionsView.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import RefundsView from "@/views/RefundsView.vue";
import PrivacyPolicyView from "@/views/PrivacyPolicyView.vue";
import BuyingGuideView from "@/views/BuyingGuideView.vue";
import WarrantyView from "@/views/WarrantyView.vue";

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
      path: "/category/",
      name: "Category",
      component: CategoryView,
    },
    {
      path: "/category/rackets",
      name: "CategoryRackets",
      component: CategoryRacketsView,
    },
    {
      path: "/category/balls",
      name: "CategoryBalls",
      component: CategoryBallsView,
    },
    {
      path: "/category/shoes",
      name: "CategoryShoes",
      component: CategoryShoesView,
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
    {
      path: "/product/:Id",
      name: "Product",
      component: ProductDetailsView,
      props: (route) => ({ productId: String(route.params.Id) }),
    },
    {
      path: "/oferta/:id",
      name: "Oferta",
      component: ProductOfertasView,
      props: (route) => ({ ofertaId: Number(route.params.id) }),
    },
    {
      path: "/category/:product/:id",
      name: "CategoryProduct",
      component: ProductDetailsView,
      props: (route) => ({
        productId: Number(route.params.id),
        fromCategory: route.params.category,
      }),
    },
    {
      path: "/search",
      name: "ProductSearch",
      component: ProductSearchView,
    },
    {
      path: "/contactUs",
      name: "ContactUs",
      component: ContactUsView,
    },
    {
      path: "/reqWarranty",
      name: "RequestWarranty",
      component: RequestWarrantyView,
    },
    {
      path: "/trackOrder",
      name: "TrackOrder",
      component: TrackOrderView,
    },
    {
      path: "/user",
      name: "User",
      component: UserViewView,
    },
    {
      path: "/physicalStore",
      name: "PhysicalStore",
      component: PhysicalStoreView,
    },
    {
      path: "/termsAndConditions",
      name: "TermsAndConditions",
      component: TermsAndConditionsView,
    },
    {
      path: "/shoppingCart/checkout",
      name: "Checkout",
      component: CheckoutView,
    },
    {
      path: "/refunds",
      name: "Refunds",
      component: RefundsView,
    },
    {
      path: "/privacyPolicy",
      name: "PrivacyPolicy",
      component: PrivacyPolicyView,
    },
    {
      path: "/buyingGuide",
      name: "BuyingGuide",
      component: BuyingGuideView,
    },
    {
      path: "/warranty",
      name: "Warranty",
      component: WarrantyView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundView,
    },
  ],
  // Hace que las rutas se abran en la posicion superior y no en el lugar donde se quedó
  scrollBehavior() {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

export default router;
