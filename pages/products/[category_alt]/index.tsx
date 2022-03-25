import React, { useEffect, useState } from "react";
import Link from "next/link";
import {Spinner} from "react-bootstrap";

import { Container, Row, Col } from "react-bootstrap";
import { GetStaticProps } from "next";

import deepEqual from "fast-deep-equal";

import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";

import { CategoryModel } from "../../../model/Category";
import { getCategories } from "../../api/categories";
import { getCategoryById } from "../../api/categories/[category_id]";

import { ProductModel } from "../../../model/Product";
import { getProductsPageByCategory } from "../../api/categories/[category_id]/products";

import { getValueAsString, onCompleted } from "../../../utils";

import Layout from "../../../components/layout";
import MainNav from "../../../components/common/Breadcrumb";
import RightMenu from "../../../components/common/RightMenu";
import ProductGrid from "../../../components/products/ProductGrid";

import { getProductsByCategoryFn } from "../../../queries-fn/product.fn";
import { GET_PRODUCTS_OF_CATEGORY } from "../../../queries-fn/keys";

export interface CategoryPageProps {
  category: CategoryModel;
  products: ProductModel[];
  totalPages: number;
}

export default function CategoryPage({
  category,
  products,
  totalPages,
}: CategoryPageProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { query, pathname } = router;
  const [serverQuery, setServerQuery] = useState(query);

  // Fetch fb from API
  const { isLoading, data } = useQuery(
    [GET_PRODUCTS_OF_CATEGORY, query],
    () =>
      getProductsByCategoryFn({ category_id: category.id, page: query.page }),
    {
      enabled: true,
      initialData: deepEqual(query, serverQuery)
        ? { products, totalPages }
        : undefined,
      keepPreviousData: true,
      staleTime: 15000,
      onSettled: async (data, err) => {
        const response = await onCompleted(data, err, router, queryClient);
        if (response) {
          if (!deepEqual(query, serverQuery)) {
            setServerQuery(query);
          }
        }
      },
    }
  );

  return (
    <React.Fragment>
      <div className={`loading-overlay, ${isLoading ? "d-block" : "d-none"}`}>
        <Spinner className="spinner-md" animation="border" variant="warning" />
      </div>

      <Layout>
        <div id="render-body">
          <div className="container">
            <MainNav>
              {category && (<li className="breadcrumb-item">
                <Link
                  href="/products/[category_alt]"
                  as={`/products/${category.alt}-${category.id}`}
                >
                  <a title={category.title}>{category.title}</a>
                </Link>
              </li>)}
            </MainNav>

            <Row className="row">
              <Container className="col-md-9">
                <ProductGrid
                  products={data.products}
                  totalPages={totalPages}
                  query={query}
                  pathname={pathname}
                />
              </Container>

              <Col md={3}>
                {category && (<RightMenu
                  currentCategory={category.id}
                />)}
              </Col>
            </Row>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category_alt = getValueAsString(params.category_alt);
  const category_id = parseInt(category_alt.split("-")[1]);

  const [category, pagintion] = await Promise.all([
    getCategoryById(category_id),
    getProductsPageByCategory(category_id),
  ]);

  return {
    props: {
      category,
      products: pagintion.products,
      totalPages: pagintion.totalPages,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const paths = [];

  const categories = await getCategories();
  for (const category of categories) {
    paths.push({ params: { category_alt: category.alt + "-" + category.id } });
  }

  return {
    paths,
    fallback: true,
  };
};
