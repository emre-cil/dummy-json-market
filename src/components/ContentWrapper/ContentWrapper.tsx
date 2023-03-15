import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import classes from './ContentWrapper.module.scss';

function ContentWrapper() {
  return (
    <div className={classes.container}>
      <Header />
      <Outlet />
    </div>
  );
}

export default ContentWrapper;
