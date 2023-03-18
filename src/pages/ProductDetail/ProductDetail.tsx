import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductWithIdQuery } from '@/features/products/productsApiSlice';
import Gallery from '@/components/Gallery/Gallery';
import classes from './ProductDetail.module.scss';
import { BsFillBasketFill } from 'react-icons/bs';

function ProductDetail() {
  const { id } = useParams();
  const { data: item, isloading, error } = useGetProductWithIdQuery(id);
  console.log(item);
  return (
    <div className="container-lg">
      <div className="dynamic-row" style={{ marginTop: '20px' }}>
        {item?.images?.length > 0 && (
          <div className={classes.section}>
            <Gallery images={item.images} />
          </div>
        )}
        <div className={`${classes.section} ${classes.section_detail}`}>
          <div>
            <h1>{item?.title}</h1>
            <h3>{item?.brand}</h3>
          </div>

          <div className={classes.price_container}>
            <h2>${item?.price}</h2>
            <button>
              <BsFillBasketFill />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
