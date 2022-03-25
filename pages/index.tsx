import React from 'react';
import Link from 'next/link';

import { GetStaticProps } from 'next';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';

import { useRouter } from "next/router";

import { AppContext } from '../context';

import { CategoryModel } from '../model/Category';
import { getCategories } from './api/categories';

import { ProductModel } from '../model/Product';
import { getProductsFeature } from './api/products/feature';

import Layout from '../components/layout';

import CategoriesSlider from '../components/categories/CategoriesSlider';
import ProductCarousel from '../components/products/ProductCarousel';
import ProductFeature from '../components/products/ProductFeature';
import About from '../components/common/About';

export interface HomeProps {
  categories: CategoryModel[];
  products: ProductModel[];
  totalPages: number;
}

export default function Home({products, totalPages}: HomeProps) {
  const router = useRouter();
  const {query} = router;

  return (
    <React.Fragment>
      <div
        className={`loading-overlay, ${
          router.isFallback ? "d-block" : "d-none"
        }`}
      >
        <Spinner className="spinner-md" animation="border" variant="warning" />
      </div>

      <Layout>
        <div id="render-body">
          <div className="main-content">
            <div className="bg-overlay-gray-darkest-1">
              <Container>
                {/* CAROUSEL PRODUCTS */}
                <ProductCarousel />

                {/* FEATURE CATEGORIES */}
                <div className="feature-categories">
                  <AppContext.Consumer>
                    {({ categories }) => categories && categories.length > 0 ? (
                      <Row>
                        <Col md={12}>
                          <CategoriesSlider categories={categories} />
                        </Col>
                      </Row>
                    ) : null}
                  </AppContext.Consumer>
                </div>
              </Container>
            </div>

            <div className="product-priority-list">
              <Container>
                {/* FEATURE PRODUCTS */}
                <About />

                {/* FEATURE PRODUCTS */}
                <Row>
                  <ProductFeature products={products} />
                </Row>

                {/* FEATURE PRODUCTS FOOTER */}
                <Row className="product-priority-list-footer">
                  <Col sm={12} md={{ span: 4, offset: 4 }}>
                    <Link
                      href={{
                        pathname: "/products",
                        query: { ...query, page: 1 },
                      }}
                    >
                      {totalPages > 0 && (
                        <Button type="button" variant="light">
                          Xem thêm
                        </Button>
                      )}
                    </Link>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps =  async ({ params }) => {
  const [categories, pagination] = await Promise.all([getCategories(), getProductsFeature()]);

  return {
    props: {
      categories,
      products: pagination.products,
      totalPages: pagination.totalPages,
    },
    revalidate: 20,
  };
};

// export async function getServerSideProps({ req, res }) {
//   res.setHeader(
//     'Cache-Control',
//     'public, s-maxage=10, stale-while-revalidate=59'
//   )

//   return {
//     props: {
//       time: new Date().toISOString(),
//     },
//   }
// }

// pages/index.tsx is considered fresh for ten seconds (s-maxage=10). 
// If a request is repeated within the next 10 seconds, the previously cached value will still be fresh. 
// If the request is repeated before 59 seconds, the cached value will be stale but still render (stale-while-revalidate=59).
// In the background, a revalidation request will be made to populate the cache with a fresh value. If you refresh the page, you will see the new
