import { ProductDetailPage } from '../pages/ProductDetailPage';
import { PaymentPage } from '../pages/PaymentPage';
import { ShoppingCartsPage } from '../pages/ShoppingCartsPage';
import { AccountPage } from '../pages/AccountPage';
import { SearchPage } from '../pages/SearchPage';
import { Home } from '../pages/Home';
import { OrderDetailPage } from '../pages/OrderDetailPage';

// Publishes Route user foll all users
const publicRoutes = [
  { path: '/', component: Home },
  { path: '/books/:bookid', component: ProductDetailPage },
  { path: '/payment', component: PaymentPage },
  { path: '/shoppingcarts', component: ShoppingCartsPage },
  { path: '/account', component: AccountPage },
  { path: '/account/:tab', component: AccountPage },
  { path: '/search', component: SearchPage },
  { path: '/order-detail/:order?', component: OrderDetailPage },
];

// Private Route user for registration user
const privateRoutes = [];

export { publicRoutes, privateRoutes };
