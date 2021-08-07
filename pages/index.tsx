import React from 'react';
import Link from 'next/link';

import { GetStaticProps } from 'next';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';

import { useRouter } from "next/router";

import { useAppContext } from '../context';

import { CategoryModel } from '../model/Category';
import { getCategories } from './api/categories';

import { ProductModel } from '../model/Product';
import { getProductsFeature } from './api/products/feature';

import { getValueAsNumber } from '../utils';

import Layout from '../components/layout';

import CategoriesSlider from '../components/categories/CategoriesSlider';
import ProductsCarousel from '../components/products/ProductsCarousel';
import FeatureProducts from '../components/products/FeatureProducts';

export interface HomeProps {
  categories: CategoryModel[];
  products: ProductModel[];
  totalPages: number;
}

export default function Home({products, totalPages}: HomeProps) {
  const router = useRouter();

  const {query} = router;
  const {categories} = useAppContext();

  return (
    <React.Fragment>
      <div className={`loading-overlay, ${router.isFallback ? "d-block" : "d-none"}`}>
        <Spinner className="spinner-md" animation="border" variant="warning" />
      </div>

      <Layout>
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

            <div className="product-priority-list">
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
                  <FeatureProducts products={products} />
                </Row>

                {/* FEATURE PRODUCTS FOOTER */}
                <Row className="product-priority-list-footer">
                  <Col sm={12} md={{span: 4, offset: 4}}>
                    <Link
                      href={{
                        pathname: "/products",
                        query: { ...query, page: 1 },
                      }}
                    >
                      {totalPages > 0 && <Button type="button" variant="light">Xem thêm</Button>}
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
  const page = params ? getValueAsNumber(params.page) : 1;
  console.log('params: ', params);  

  const [categories, pagination] = await Promise.all([getCategories(), getProductsFeature(page)]);

  return {
    props: {
      categories,
      products: pagination.products,
      totalPages: pagination.totalPages,
    },
    revalidate: 20,
  };
};
