import React from 'react';
import type { AddressType } from '@/pages/Address/Address';
import { RxCross2 } from 'react-icons/rx';
import classes from './AddressCard.module.scss';
import { removeAddress } from '@/features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

const AddressCard = ({ address, selectedAddress, setSelectedAddress }: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRemove = () => {
    dispatch(removeAddress(address.id));
    toast.success(t('address.removed'));
  };
  return (
    <div
      className={classes.container}
      style={{
        borderColor: selectedAddress === address?.id ? '#f0c14b' : 'grey',
      }}
      onClick={() => setSelectedAddress && setSelectedAddress(address.id)}
    >
      <div className={classes.address}>
        <div>
          <h4>{address.name}</h4>
          <h4>{address.surname}</h4>
        </div>
        <h5>{address.address}</h5>
        <div>
          <h5>{address.city}</h5> / <h5>{address.town}</h5>
        </div>
        <h5>{address.doorNo}</h5>
        <RxCross2 onClick={handleRemove} />
      </div>
    </div>
  );
};

export default AddressCard;
