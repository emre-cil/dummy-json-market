import React from 'react';
import classes from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
type ProductCardProps = {
  product: {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    brand: string;
    discountPercentage: number;
  };
  isFavorite?: boolean;
  favoriteHandler: (id: string) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, isFavorite, favoriteHandler }) => {
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
            ${product.price}
          </h6>
          <h6>${Math.round((product.price * (100 - product.discountPercentage)) / 100)}</h6>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
