import React, { useMemo } from 'react';
import classes from './CartOperation.module.scss';
import { useTranslation } from 'react-i18next';
const CartOperation = ({ cartList }: any) => {
  const { t } = useTranslation();
  const sumAll = useMemo(() => {
    return cartList?.reduce((acc: any, cur: any) => {
      return acc + cur.price * cur.quantity;
    }, 0);
  }, [cartList]);

  return (
    <div className={classes.container}>
      <div className={classes.total}>
        <h3>{t('cart.total')}:</h3>
        <h3>${sumAll}</h3>
      </div>
      <button>{t('cart.checkout')}</button>
    </div>
  );
};

export default CartOperation;
