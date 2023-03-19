import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '@/pages/NotFound/NotFound';
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper';
import Products from '@/pages/Products/Products';
import Favorites from '@/pages/Favorites/Favorites';
import Cart from '@/pages/Cart/Cart';
import ProductDetail from '@/pages/ProductDetail/ProductDetail';
import Address from '@/pages/Address/Address';

const Routing = () => {
  return (
    <Routes>
      <Route element={<ContentWrapper />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/address" element={<Address />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default Routing;
