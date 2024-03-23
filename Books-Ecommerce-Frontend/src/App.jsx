
import { DescriptionFeedback } from "./components/DescriptionFeedback"
import { Header } from "./components/Header"


import { DetailCart } from "./components/DetailCart";
import { DescriptionFeedback } from "./components/DescriptionFeedback";
import { ShoppingCarts } from "./components/ShoppingCarts";
import { ShoppingCartsPopup } from "./components/ShoppingCartsPopup";



import { Footer } from "./components/Footer";
import {Navbar} from "./components/Navbar"
function App() {
  return (
    <>

      <Header/>
      <Navbar/>
      <DetailCart />
      <DescriptionFeedback />
      <Footer/>
      
       
      {/*<DescriptionFeedback />*/}
      {/*<ShoppingCarts />*/}
      {/*<ShoppingCartsPopup />*/}

    </>
  );
}

export default App;
