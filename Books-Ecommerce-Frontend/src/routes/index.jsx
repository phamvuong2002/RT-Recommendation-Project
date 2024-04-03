import { ProductDetailPage } from "../pages/ProductDetailPage";
import { PaymentPage } from "../pages/PaymentPage";
import { ShoppingCartsPage } from "../pages/ShoppingCartsPage";
import { Home } from "../pages/Home";

// Publishes Route user foll all users
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/books/:bookid', component: ProductDetailPage },
    { path: '/payment', component: PaymentPage },
    { path: '/shoppingcarts', component: ShoppingCartsPage }
];

// Private Route user for registration user
const privateRoutes = [];

export { publicRoutes, privateRoutes }