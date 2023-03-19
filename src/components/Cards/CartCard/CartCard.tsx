import React, { useState } from 'react';
import {
  reduceCart,
  removeCart,
  addCart,
  selectMode,
  selectFavorites,
  handleFavorite,
} from '@/features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import classes from './CartCard.module.scss';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import Modal from '@/components/Modal/Modal';
type CartCardProps = {
  cart: {
    id: number;
    quantity: number;
    title: string;
    brand: string;
    price: number;
    thumbnail: string;
    stock: number;
    discountPercentage: number;
  };
};
const CartCard: React.FC<CartCardProps> = ({ cart }) => {
  const mode = useSelector(selectMode);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${classes.wrapper} 
    ${mode === 'dark' ? classes.dark : ''}
    `}
    >
      <img src={cart.thumbnail} alt={cart.title} />
      <div className={classes.info}>
        <h4>{cart.title}</h4>
        <p>{cart.brand}</p>
        {/* display old price before discount reduce discount */}

        <h6>${Math.round(cart.price / (1 - cart.discountPercentage / 100))} </h6>
        <h5>${cart.price} </h5>
      </div>
      <div className={classes.quantity_wrapper}>
        <div className={classes.quantity}>
          <IoRemove
            onClick={() => {
              dispatch(reduceCart(cart));
            }}
          />
          <p>{cart.quantity}</p>

          <IoAdd
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                addCart({
                  ...cart,
                  quantity: 1,
                }),
              );
            }}
          />
        </div>
        <div>
          <h6>${Math.round((cart.price / (1 - cart.discountPercentage / 100)) * cart.quantity)} </h6>
          <h5>${cart.price * cart.quantity}</h5>
        </div>
      </div>
      <RxCross2 className={classes.remove} onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          title={t('cart.remove') + ' ' + cart.title + ' ' + t('cart.fromCart') + '?'}
          btn_opt1={() => {
            dispatch(removeCart(cart.id));
            toast.success(cart.title + ' ' + t('product.removed'));
          }}
          btn_opt2={() => {
            const id = cart.id;
            dispatch(handleFavorite(id.toString()));
            dispatch(removeCart(cart.id));
            toast.success(cart.title + ' ' + t('product.removed'));
          }}
          btn_title_1={t('cart.removeBtn')}
          btn_title_2={!favorites?.includes(cart?.id.toString()) && t('cart.removeAndFavBtn')}
        />
      )}
    </div>
  );
};

export default CartCard;
