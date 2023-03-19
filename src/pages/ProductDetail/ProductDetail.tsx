import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductWithIdQuery } from '@/features/products/productsApiSlice';
import Gallery from '@/components/Gallery/Gallery';
import classes from './ProductDetail.module.scss';
import { BsFillBasketFill } from 'react-icons/bs';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useFavorite } from '@/hooks/useFavorite';
import { addCart } from '@/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: item } = useGetProductWithIdQuery(id);
  const { favorites, handleFavorite } = useFavorite();

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
                    id && handleFavorite(id.toString());
                  }}
                >
                  {id && favorites.includes(id) ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
                </div>
                <div className={classes.stars}>
                  <div
                    style={{
                      background: `linear-gradient(90deg, $primary ${(item?.rating / 5) * 100}%, #9c9c9c ${
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
              <div className={classes.description_container}>{item?.description}</div>
              <div className={classes.price_container}>
                <div>
                  <h4
                    style={{
                      textDecoration: 'line-through',
                      color: 'gray',
                    }}
                  >
                    ${Math.round(item?.price / (1 - item?.discountPercentage / 100))}
                  </h4>
                  <h2>${item?.price}</h2>
                </div>
                <button
                  onClick={() => {
                    dispatch(
                      addCart({
                        ...item,
                        quantity: 1,
                      }),
                    );
                    navigate('/cart');
                  }}
                >
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
