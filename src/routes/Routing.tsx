import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import NotFound from '@/pages/NotFound/NotFound';
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper';
import Products from '@/pages/Products/Products';
import Favorites from '@/pages/Favorites/Favorites';
import Cart from '@/pages/Cart/Cart';
import ProductDetail from '@/pages/ProductDetail/ProductDetail';

const Routing = () => {
  return (
    <Routes>
      <Route element={<ContentWrapper />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default Routing;
