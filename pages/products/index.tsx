import React, { useState } from 'react';

import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { GetStaticProps } from 'next';

import deepEqual from "fast-deep-equal";

import { useRouter } from "next/router";
import { useQuery, useQueryClient } from 'react-query';

import { ProductModel } from '../../model/Product';
import { getProducts } from '../api/products';

import { onCompleted } from '../../utils';

import Layout from '../../components/layout';
import MainNav from '../../components/common/MainNav';
import RightMenu from '../../components/common/RightMenu';
import ProductsContainer from '../../components/categories/ProductsContainer';

import { getProductsFn } from '../../queries-fn/product.fn';
import { GET_PRODUCTS } from '../../queries-fn/keys';

export interface ProductPageProps {
  products: ProductModel[];
  totalPages: number;
};

export default function ProductPage({products, totalPages}: ProductPageProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {query, pathname} = router;
  const [serverQuery] = useState(query);

  // Fetch fb from API
  const { isLoading, data } = useQuery([GET_PRODUCTS, query], 
    () => getProductsFn({page: query.page}), 
    {
      enabled: true,
      initialData: deepEqual(query, serverQuery)
        ? {products, totalPages}
        : undefined,
      keepPreviousData: true,
      staleTime: 15000,
      onSettled: (data, err) => onCompleted(data, err, router, queryClient)
    });

    return (
      <React.Fragment>
        <div className={`loading-overlay, ${isLoading ? "d-block" : "d-none"}`}>
          <Spinner className="spinner-md" animation="border" variant="warning" />
        </div>

        <Layout>
          <div id="Render-Body">
            <div className="container">
              <MainNav />

              <Row className="row">
                <Container className="col-md-9">
                  <ProductsContainer
                    products={data.products}
                    totalPages={totalPages}
                    query={query}
                    pathname={pathname}
                  />
                </Container>

                <Col md={3}><RightMenu /></Col>
              </Row>
            </div>
          </div>
        </Layout>
      </React.Fragment>
    );
};

export const getStaticProps: GetStaticProps = async () => {
  const [pagintion] = await Promise.all([getProducts()]);

  return {
    props: {
      products: pagintion.products,
      totalPages: pagintion.totalPages,
    },
  };
};
