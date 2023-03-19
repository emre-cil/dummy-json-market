import { selectCart } from '@/features/user/userSlice';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import classes from './Cart.module.scss';
import { useGetProductsQuery } from '@/features/products/productsApiSlice';
import CartCard from '@/components/Cards/CartCard/CartCard';
import CartOperation from '@/components/CartOperation/CartOperation';

function Cart() {
  const { data: item } = useGetProductsQuery(undefined);
  const carts = useSelector(selectCart);
  const cartsWithProduct = useMemo(() => {
    return carts?.map((cart) => {
      const product = item?.products?.find((product: any) => product.id === cart.id);
      return { ...cart, ...product };
    });
  }, [carts, item]);

  return (
    <div className="container-lg">
      <div className="dynamic-row">
        <div className={classes.carts}>
          {cartsWithProduct?.map((cart) => (
            <CartCard key={cart.id} cart={cart} />
          ))}
        </div>
        <CartOperation cartList={cartsWithProduct} />
      </div>
    </div>
  );
}

export default Cart;
