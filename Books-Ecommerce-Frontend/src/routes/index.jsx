import { ProductDetailPage } from "../pages/ProductDetailPage";
import { PaymentPage } from "../pages/PaymentPage";
import { ShoppingCartsPage } from "../pages/ShoppingCartsPage";
import { AccountPage } from "../pages/AccountPage";
import { Home } from "../pages/Home";
import { GeneralInfomation } from "../pages/GeneralInfomation";

// Publishes Route user foll all users
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/books/:bookid', component: ProductDetailPage },
    { path: '/payment', component: PaymentPage },
    { path: '/shoppingcarts', component: ShoppingCartsPage },
    { path: '/account', component: AccountPage },
    { path: '/genaral-infomation', component: GeneralInfomation },

];

// Private Route user for registration user
const privateRoutes = [];

export { publicRoutes, privateRoutes }