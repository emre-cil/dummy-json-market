import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductWithIdQuery } from '@/features/products/productsApiSlice';
import Gallery from '@/components/Gallery/Gallery';
import classes from './ProductDetail.module.scss';
import { BsFillBasketFill } from 'react-icons/bs';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useFavorite } from '@/hooks/useFavorite';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: item, isloading, error } = useGetProductWithIdQuery(id);
  const { favorites, handleFavorite } = useFavorite();
  console.log(item);
  return (
    <div className="container-lg">
      <div className="dynamic-row" style={{ marginTop: '20px' }}>
        <div className={classes.section}>{item?.images?.length > 0 && <Gallery images={item.images} />}</div>
        <div className={`${classes.section} ${classes.section_detail}`}>
          {item && (
            <>
              <div className={classes.title_container}>
                <h1>{item?.title}</h1>
                <h3>{item?.brand}</h3>
                <div
                  className={classes.favorite}
                  onClick={(e) => {
                    e.preventDefault();
                    id && handleFavorite(id);
                  }}
                >
                  {id && favorites.includes(id) ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
                </div>
                <div className={classes.stars}>
                  <div
                    style={{
                      background: `linear-gradient(90deg, #f0c14b ${(item?.rating / 5) * 100}%, #9c9c9c ${
                        (item?.rating / 5) * 100
                      }%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                    }}
                  >
                    ★★★★★
                  </div>
                </div>
              </div>
              <div className={classes.price_container}>
                <div>
                  <h4
                    style={{
                      textDecoration: 'line-through',
                      color: 'gray',
                    }}
                  >
                    ${item?.price}
                  </h4>
                  <h2>${Math.round((item?.price * (100 - item?.discountPercentage)) / 100)}</h2>
                </div>
                <button>
                  <BsFillBasketFill />
                  Add to cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
