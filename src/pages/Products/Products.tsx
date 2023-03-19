import React, { useState, useMemo } from 'react';
import { useGetProductsQuery } from '@/features/products/productsApiSlice';
import classes from './Products.module.scss';
import ProductCard from '@/components/Cards/ProductCard/ProductCard';
import ProductsFilter from '@/components/Filters/ProductsFilter/ProductsFilter';
import useDebounce from '@/hooks/useDebounce';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectFavorites } from '@/features/user/userSlice';
export type ProductType = {
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
  const { t } = useTranslation();
  const { data: item } = useGetProductsQuery(undefined);
  const favorites = useSelector(selectFavorites);
  const options = [
    { value: 'default', label: t('products.default') },
    { value: 'price-desc', label: t('products.price-desc') },
    { value: 'price-asc', label: t('products.price-asc') },
    { value: 'rating-desc', label: t('products.rating-desc') },
    { value: 'rating-asc', label: t('products.rating-asc') },
    { value: 'stock-desc', label: t('products.stock-desc') },
    { value: 'stock-asc', label: t('products.stock-asc') },
    { value: 'discount-desc', label: t('products.discount-desc') },
    { value: 'discount-asc', label: t('products.discount-asc') },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [search, setSearch] = useState('');
  // debounce search
  const debouncedSearch = useDebounce(search, 500);
  // filter products according to search term
  const filteredProducts = useMemo(() => {
    let products = item?.products || [];

    if (debouncedSearch) {
      // search by title or brand
      products = products.filter((product: ProductType) => {
        return (
          product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          product.brand.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
      });
    }

    if (selectedOption !== 'default') {
      // sort by type
      switch (selectedOption) {
        case 'price-desc':
          products = [...products].sort((a: ProductType, b: ProductType) => b.price - a.price);
          break;
        case 'price-asc':
          products = [...products].sort((a: ProductType, b: ProductType) => a.price - b.price);
          break;
        case 'rating-desc':
          products = [...products].sort((a: ProductType, b: ProductType) => b.rating - a.rating);
          break;
        case 'rating-asc':
          products = [...products].sort((a: ProductType, b: ProductType) => a.rating - b.rating);
          break;
        case 'stock-desc':
          products = [...products].sort((a: ProductType, b: ProductType) => b.stock - a.stock);
          break;
        case 'stock-asc':
          products = [...products].sort((a: ProductType, b: ProductType) => a.stock - b.stock);
          break;
        case 'discount-desc':
          products = [...products].sort(
            (a: ProductType, b: ProductType) => b.discountPercentage - a.discountPercentage,
          );
          break;
        case 'discount-asc':
          products = [...products].sort(
            (a: ProductType, b: ProductType) => a.discountPercentage - b.discountPercentage,
          );
          break;
        default:
          break;
      }
    }

    return products;
  }, [debouncedSearch, item?.products, selectedOption]);

  return (
    <div className="container-lg">
      <div className="dynamic-row">
        <ProductsFilter
          search={search}
          setSearch={setSearch}
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <div className={classes.products}>
          {filteredProducts?.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} isFavorite={favorites.includes(product?.id.toString())} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
