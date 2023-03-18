import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import NotFound from '@/pages/NotFound/NotFound';
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper';
import Products from '@/pages/Products/Products';
import Favorites from '@/pages/Favorites/Favorites';
import Basket from '@/pages/Basket/Basket';

const Routing = () => {
  return (
    <Routes>
      <Route element={<ContentWrapper />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/basket" element={<Basket />} />
      </Route>
    </Routes>
  );
};

export default Routing;
