
import { DescriptionFeedback } from "./components/DescriptionFeedback"
import { Header } from "./components/Header"


import { DetailCart } from "./components/DetailCart";
import { DescriptionFeedback } from "./components/DescriptionFeedback"
import { Product } from "./components/Product"
import { SliderProducts } from "./components/SliderProducts"
import { FlashSale } from "./components/FlashSale"
import { Category } from "./components/Category"
import { AllProducts } from "./components/AllProducts"
// import { DescriptionFeedback } from "./components/DescriptionFeedback";
// import { ShoppingCarts } from "./components/ShoppingCarts";
// import { ShoppingCartsPopup } from "./components/ShoppingCartsPopup";



import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar"
import Slider from "./components/Slider";
function App() {
  return (
    <>
      {/* <DetailCart /> */}
      <AllProducts />

      <Header />
      <Navbar />
      <Slider />
      <DetailCart />
      <DescriptionFeedback />
      <Footer />


      {/*<DescriptionFeedback />*/}
      {/*<ShoppingCarts />*/}
      {/*<ShoppingCartsPopup />*/}

    </>
  );
}

export default App;
