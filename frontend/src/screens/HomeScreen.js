import React, { useEffect } from 'react';

import { Row, Col } from 'react-bootstrap';
import {
  Loader,
  Product,
  Message,
  Meta,
  ProductCarousel,
  Paginate,
} from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta
        title="Welcome to prop shop | Home"
        description="we sell at cheap price"
      />
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product, i) => {
              return (
                <Col key={i} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
