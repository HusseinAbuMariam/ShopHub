import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Vendors from "./pages/Vendors";
import Store from "./pages/Store";
import SellerDetails from "./pages/SellerDetails";
import Sellers from "./pages/Sellers";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* PRODUCTS */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* USER FEATURES */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/account" element={<Account />} />

        {/* INFO PAGES */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* AUTH */}
        <Route path="/register" element={<Register />} />
        {/* VENDORS */}
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/store/:id" element={<Store/>} />
        <Route path="/sellers/:id" element={<SellerDetails />} />
        <Route path="/sellers" element={<Sellers />} />
        {/* ORDER SUCCESS */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/success" element={<OrderSuccess />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}