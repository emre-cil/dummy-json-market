import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { selectMode } from '@/features/user/userSlice';
import { useSelector } from 'react-redux';

function ContentWrapper() {
  const mode = useSelector(selectMode);
  return (
    <div className={`${mode}`}>
      <Header />
      <Outlet />
    </div>
  );
}

export default ContentWrapper;
