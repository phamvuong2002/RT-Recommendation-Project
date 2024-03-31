
import { DescriptionFeedback } from "./components/DescriptionFeedback"
import { Header } from "./components/Header"
import { DetailCart } from "./components/DetailCart";
import NavigationPath from "./components/NavigationPath"
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar"
import Slider from "./components/Slider";
import { ShoppingCartLoader } from "./components/loaders/ShoppingCartLoader";
import { ShoppingCarts } from "./components/ShoppingCarts"
import { ShoppingCartsPopup } from "./components/ShoppingCartsPopup"
import { Payment } from "./components/PaymentComponent"
import ProductListStatus from "./components/ProductListStatus";
import SideBarNav from "./components/SideBarNav";
import { AllProducts } from "./components/AllProducts"
import { Category } from "./components/Category"
import { PopupOpen } from "./components/popup/PopupOpen";
import { useState } from "react";
import FilterProduct from "./components/FilterProduct"

const paths = [
  { path: '/', label: 'Trang Chủ' },
  { path: `/${'novel'}`, label: `${'Tiểu thuyết'}` },
  { path: `/${'novel'}/${'bookid'}`, label: `${'86 - Eightysix - Tập 9'}` },
]
function App() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <Header />
      <Navbar />
      <div className=" mb-10">
        <NavigationPath components={paths} />
        <div className="bg-gray-100 flex flex-col gap-[0.1rem]">
          {/* <FilterProduct /> */}
          <SideBarNav />
          {/* <ProductListStatus /> */}
          <Payment />
          {/* <Category /> */}
          {/* <AllProducts /> */}
          {/* <ShoppingCartsPopup /> */}
          {/* <ShoppingCarts /> */}
          {/* <DetailCart /> */}
          {/* <DescriptionFeedback /> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
