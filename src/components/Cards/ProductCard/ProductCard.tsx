import React from 'react';
import classes from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
type ProductCardProps = {
  product: {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
  };
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to="1" className={classes.product_wrapper}>
      <img src={product.thumbnail} alt={product.title} />
      <div className={classes.product_info}>
        <h5>{product.title}</h5>
        <h6>${product.price}</h6>
      </div>
    </Link>
  );
};

export default ProductCard;
