import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Carousel, Image } from 'react-bootstrap';
import { Loader, Message } from '.';

import { listTopProducts } from '../actions/productActions';

import { useDispatch, useSelector } from 'react-redux';
const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;
  useEffect(() => {
    dispatch(listTopProducts());
  }, []);
  return (
    <>
      {loading ? (
        <Loader /> ? (
          error
        ) : (
          <Message variant="danger">{error}</Message>
        )
      ) : (
        <>
          <Carousel pause="hover" className="bg-dark">
            {products.length > 0 &&
              products.map((product) => {
                return (
                  <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                      <Image alt={product.image} fluid src={product.image} />
                      <Carousel.Caption className="carousel-caption">
                        <h2>
                          {product.name} ({product.price})
                        </h2>
                      </Carousel.Caption>
                    </Link>
                  </Carousel.Item>
                );
              })}
          </Carousel>
        </>
      )}
    </>
  );
};

export default ProductCarousel;
