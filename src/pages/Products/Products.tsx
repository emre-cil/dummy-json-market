import React, { useState } from 'react';
import { useGetProductsQuery } from '@/features/products/productsApiSlice';
import classes from './Products.module.scss';
import ProductCard from '@/components/Cards/ProductCard/ProductCard';
import ProductsFilter from '@/components/Filters/ProductsFilter/ProductsFilter';
import { useFavorite } from '@/hooks/useFavorite';
type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};
function Products() {
  const { data: item, isloading, error } = useGetProductsQuery(undefined);
  const { favorites, handleFavorite } = useFavorite();

  return (
    <div className="container-lg">
      <div className="dynamic-row">
        <ProductsFilter />
        <div className={classes.products}>
          {item?.products?.map((product: ProductType) => (
            <ProductCard
              key={product.id}
              product={product}
              favoriteHandler={handleFavorite}
              isFavorite={favorites.includes(product?.id.toString())}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
