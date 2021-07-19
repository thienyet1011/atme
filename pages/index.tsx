import React, { useEffect, useState } from 'react';

import { GetStaticProps } from 'next';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import deepEqual from "fast-deep-equal";

import { useRouter } from "next/router";
import { useQuery, useQueryClient } from 'react-query';

import { useAppContext } from '../context';

import { ProductModel } from '../model/Product';
import { getProductsFeature } from './api/products/feature';

import { onCompleted } from '../utils';

import Layout from '../components/layout';
import Pagination from '../components/Pagination';

import CategoriesSlider from '../components/categories/CategoriesSlider';
import ProductsCarousel from '../components/products/ProductsCarousel';
import FeatureProducts from '../components/products/FeatureProducts';

import { getProductsFeatureFn } from '../queries-fn/product.fn';
import { GET_FEATURE_PRODUCTS } from '../queries-fn/keys';

export interface HomeProps {
  products: ProductModel[];
  totalPages: number;
}

export default function Home({products, totalPages}: HomeProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { categories, setPage } = useAppContext();  

  const {query} = router;
  const [serverQuery] = useState(query);

  useEffect(() => {
    setPage(0);
  }, [setPage])

  // Fetch fb from API
  const { isLoading, data } = useQuery([GET_FEATURE_PRODUCTS, query], 
    () => getProductsFeatureFn({page: query.page}), 
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

      <Layout categories={categories}>
        <div id="Render-Body">
          <div className="main-content">
            <div className="bg-overlay-gray-darkest-1">
              <Container>
                {/* CAROUSEL PRODUCTS */}
                <ProductsCarousel />

                {/* FEATURE CATEGORIES */}
                <div className="feature-categories">
                  <Row>
                    <Col md={12}>
                      <CategoriesSlider categories={categories} />
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>

            <div className="productPriority-list">
              <Container>
                <h2 className="uppercase">ATME VIỆT NAM</h2>

                <div className="mb-40">
                  <div className="company-info">
                    <div className="company-info-text">
                      <p>
                        Công ty TNHH MTV Thương mại điện tử ATME Việt Nam là một
                        doanh nghiệp trẻ, năng động với những thành viên đam mê và
                        đầy sáng tạo, nhiệt huyết.
                      </p>

                      <p>
                        Với mục tiêu trở thành công ty cung cấp các dịch vụ điện
                        tử tốt nhất trên toàn quốc, ATME Việt Nam sẽ nỗ lực hết
                        mình để trở thành một thương hiệu được tất cả khách hàng
                        tin tưởng.
                      </p>

                      <p>&nbsp;</p>
                    </div>
                  </div>
                </div>

                {/* FEATURE PRODUCTS */}
                <Row>
                  <FeatureProducts products={data?.products} />
                </Row>

                {/* PAGINATION */}
                <Pagination query={query} pathname='/' totalPages={totalPages} />
              </Container>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps =  async (ctx) => {
  const [pagintion] = await Promise.all([getProductsFeature()])  

  return {
    props: {
      products: pagintion.products,
      totalPages: pagintion.totalPages,
    },
    revalidate: 10,
  };
};
