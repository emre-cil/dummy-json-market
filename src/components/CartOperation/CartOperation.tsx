import React, { useMemo, useState } from 'react';
import classes from './CartOperation.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { selectMode, selectAddressList, emptyCart } from '@/features/user/userSlice';
import AddressCard from '../Cards/AddressCard/AddressCard';
import type { AddressType } from '@/pages/Address/Address';
import { toast } from 'react-hot-toast';

const CartOperation = ({ cartList }: any) => {
  const mode = useSelector(selectMode);
  const dispatch = useDispatch();
  const addressList = useSelector(selectAddressList);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const { t } = useTranslation();
  const sumAll = useMemo(() => {
    return cartList?.reduce((acc: any, cur: any) => {
      return acc + cur.price * cur.quantity;
    }, 0);
  }, [cartList]);

  const handleCheckout = () => {
    // remove all carts
    dispatch(emptyCart());
    toast.success(t('cart.checkoutSuccess'));
  };

  return (
    <div
      className={`${classes.container} 
    ${mode === 'dark' ? classes.dark : ''}
    `}
    >
      <div className={classes.addressList}>
        {addressList?.length === 0 && <h3>{t('cart.noAddress')}</h3>}
        {addressList?.map((address: AddressType) => (
          <AddressCard
            key={address.id}
            address={address}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        ))}
      </div>

      <div className={classes.total}>
        <h3>{t('cart.total')}:</h3>
        <h3>${sumAll}</h3>
      </div>
      <button disabled={selectedAddress === null} onClick={handleCheckout}>
        {selectedAddress === null ? t('cart.selectAddress') : t('cart.checkout')}
      </button>
    </div>
  );
};

export default CartOperation;
