import { selectCart } from '@/features/user/userSlice';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import classes from './Cart.module.scss';
import { useGetProductsQuery } from '@/features/products/productsApiSlice';
import CartCard from '@/components/Cards/CartCard/CartCard';
import CartOperation from '@/components/CartOperation/CartOperation';
import { useTranslation } from 'react-i18next';
function Cart() {
  const { t } = useTranslation();
  const { data: item } = useGetProductsQuery(undefined);
  const carts = useSelector(selectCart);
  const cartsWithProduct = useMemo(() => {
    return carts?.map((cart: any) => {
      const product = item?.products?.find((product: any) => product.id === cart.id);
      return { ...cart, ...product };
    });
  }, [carts, item]);

  return (
    <div className="container-lg">
      <div className="dynamic-row">
        {cartsWithProduct?.length > 0 ? (
          <>
            <div className={classes.carts}>
              {cartsWithProduct?.map((cart: any) => (
                <CartCard key={cart.id} cart={cart} />
              ))}
            </div>
            <CartOperation cartList={cartsWithProduct} />
          </>
        ) : (
          <div className="empty">
            <h1>{t('cart.empty')}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
