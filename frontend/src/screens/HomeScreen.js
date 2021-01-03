import React, { useEffect } from 'react';

import { Row, Col } from 'react-bootstrap';
import { Loader, Product, Message, Meta } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <Meta
        title="Welcome to prop shop | Home"
        description="we sell at cheap price"
      />
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product, i) => {
            return (
              <Col key={i} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
