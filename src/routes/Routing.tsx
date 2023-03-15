import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import NotFound from '@/pages/NotFound/NotFound';
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper';
import ProtectedRoute from './ProtectedRoute';
import { useSelector } from 'react-redux';
import { selectToken } from '@/features/user/userSlice';

const Routing = () => {
  const accessToken = useSelector(selectToken);
  const hasRefresh = localStorage.getItem('has-refresh');
  // const { isLoading } = useRefreshQuery(hasRefresh, {
  //   skip: !hasRefresh || accessToken !== null,
  // });

  return (
    <Routes>
      <Route element={<ContentWrapper />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute isLoading={false} hasRefresh={hasRefresh} accessToken={accessToken} />}></Route>
      </Route>
      {/* {(!hasRefresh || !accessToken) && !isLoading && (
        <>
          <Route path="login" element={<Login />} />
        </>
      )} */}
    </Routes>
  );
};

export default Routing;
