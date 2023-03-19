import React from 'react';
import classes from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, selectMode, handleFavorite } from '@/features/user/userSlice';

type ProductCardProps = {
  product: {
    id: number;
    title: string;
    price: number;
    stock: number;
    thumbnail: string;
    brand: string;
    discountPercentage: number;
  };
  isFavorite?: boolean;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite }) => {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  return (
    <Link
      to={`/products/${product.id.toString()}`}
      className={`${classes.product_wrapper} ${mode === 'dark' ? classes.dark : ''}`}
    >
      <div className={classes.discount}>{Math.round(product.discountPercentage)}%</div>
      <div
        className={classes.favorite}
        onClick={(e) => {
          e.preventDefault();
          dispatch(handleFavorite(product.id.toString()));
        }}
      >
        {isFavorite ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
      </div>

      <img src={product.thumbnail} alt={product.title} />
      <div className={classes.product_info_wrapper}>
        <div className={classes.product_info}>
          <div>
            <h6>{product.title}</h6>
            <p>{product.brand}</p>
          </div>
          <div className={classes.price_section}>
            <h6
              style={{
                textDecoration: 'line-through',
                color: 'gray',
              }}
            >
              ${Math.round(product.price / (1 - product.discountPercentage / 100))}
            </h6>
            <h6>${product.price}</h6>
          </div>
        </div>
        <AiOutlineShoppingCart
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              addCart({
                ...product,
                quantity: 1,
              }),
            );
          }}
        />
      </div>
    </Link>
  );
};

export default ProductCard;
