import React, { useMemo } from 'react';
import classes from './Favorites.module.scss';
import { useFavorite } from '@/hooks/useFavorite';
import { useGetProductsQuery } from '@/features/products/productsApiSlice';
import ProductCard from '@/components/Cards/ProductCard/ProductCard';
import type { ProductType } from '@/pages/Products/Products';
import { useTranslation } from 'react-i18next';
function Favorites() {
  const { t } = useTranslation();
  const { data: item } = useGetProductsQuery(undefined);
  const { favorites, handleFavorite } = useFavorite();
  const favoriteProducts = useMemo(() => {
    return item?.products?.filter((product: ProductType) => favorites.includes(product?.id.toString()));
  }, [favorites, item?.products]);

  return (
    <div className="container-lg">
      {favoriteProducts?.length > 0 ? (
        <div className={classes.products}>
          {favoriteProducts?.map((product: ProductType) => (
            <ProductCard
              key={product.id}
              product={product}
              favoriteHandler={handleFavorite}
              isFavorite={favorites.includes(product?.id.toString())}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h1>{t('favorites.empty')}</h1>
        </div>
      )}
    </div>
  );
}

export default Favorites;
