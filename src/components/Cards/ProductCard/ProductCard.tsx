import React from 'react';
import classes from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCart } from '@/features/user/userSlice';
import { useTranslation } from 'react-i18next';
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
  favoriteHandler: (id: string) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite, favoriteHandler }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Link to={`/products/${product.id.toString()}`} className={classes.product_wrapper}>
      <div className={classes.discount}>{Math.round(product.discountPercentage)}%</div>
      <div
        className={classes.favorite}
        onClick={(e) => {
          e.preventDefault();
          favoriteHandler(product.id.toString());
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
            const test = dispatch(
              addCart({
                ...product,
                toast: true,
                t: t,
              }),
            );
          }}
        />
      </div>
    </Link>
  );
};

export default ProductCard;
