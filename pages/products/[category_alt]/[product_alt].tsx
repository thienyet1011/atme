import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { Container, Row, Col } from "react-bootstrap";
import { GetStaticProps } from "next";

import numeral from "numeral";

import { CategoryModel } from "../../../model/Category";
import { getCategories } from "../../api/categories";
import { getCategoryById } from "../../api/categories/[category_id]";
import {
  getProductsByCategory,
  getSimilarProductsByCategory,
} from "../../api/categories/[category_id]/products";

import { ProductModel } from "../../../model/Product";
import { getProductById } from "../../api/products/[id]";

import { getValueAsString } from "../../../utils";

import Layout from "../../../components/layout";
import MainNav from "../../../components/common/MainNav";
import RightMenu from "../../../components/common/RightMenu";
import ProductsSlider from "../../../components/products/ProductsSlider";

export interface ProductProps {
  category: CategoryModel;
  product: ProductModel;
  similars: ProductModel[];
};

export default function Product({category, product, similars}: ProductProps) {
  return (
    <Layout>
      <div id="Render-Body">
        <Container>
          <MainNav>
            {category && (<li className="breadcrumb-item">
              <Link
                href="/products/[category_alt]"
                as={`/products/${category.alt}-${category.id}`}
              >
                <a title={category.title}>{category.title}</a>
              </Link>
            </li>)}
            
            {product && (<li className="breadcrumb-item">
              <Link
                href="/products/[category_alt]/[product_alt]"
                as={`/products/${category.alt}-${category.id}/${product.alt}-${product.id}`}
              >
                <a title={product.title}>{product.title}</a>
              </Link>
            </li>)}
          </MainNav>

          <Row className="product-detail-content">
            <Col md={9}>
              {product && (<Container>
                <Row>
                  <Col md={6} className="product-img-detail">
                    <div className="title-product-mobile">
                      <h3>{product.title}</h3>
                    </div>

                    <Image
                      src={product.image}
                      width={2568}
                      height={1926}
                      alt={product.alt}
                      layout="responsive"
                    />
                  </Col>

                  <Col md={6} className="bg-detail-product">
                    <div className="product-info-detail-mobile">
                      <h3 className="product-detail-name mb-20">{product.title}</h3>

                      {product.showPrice
                        ? (
                          <p className="product-detail-cost">
                            Giá tham khảo:
                            <span className="price">{numeral(product.price).format("#,###")} VNĐ</span>
                          </p>
                        )
                        : (
                          <p className="product-detail-cost">
                            Giá liên hệ
                          </p>
                        )
                      }
                    </div>

                    <div className="product-info-detail mt-20">
                    {product.showPrice
                        ? (
                          <h4 className="product-description-mobile">
                            Giá tham khảo:
                            <span className="w-50">{numeral(product.price).format("#,###")} VNĐ</span>
                          </h4>
                        )
                        : (
                          <h4 className="product-description-mobile">
                            Giá liên hệ
                          </h4>
                        )
                      }

                      <h4 className="product-description">Mô tả</h4>

                      <div>
                        <span style={{ fontSize: "14px" }}>
                          <strong>TÌNH TRẠNG: </strong>
                          {product.status
                            ? (<strong>(còn hàng) {product.quantity} cái</strong>)
                            : (<strong>(hết hàng)</strong>)
                          }
                        </span>
                      </div>

                      <div className="product-description" dangerouslySetInnerHTML={{ __html: product.description }} />

                      <p
                        style={{
                          boxSizing: "border-box",
                          margin: "0px 0px 10px",
                          lineHeight: "15px",
                          fontSize: "14px",
                          color: "rgb(0, 0, 0)",
                        }}
                      >
                        <strong>CÁCH ĐẶT HÀNG:</strong>:
                      </p>

                      <p
                        style={{
                          boxSizing: "border-box",
                          margin: "0px 0px 10px",
                          lineHeight: "15px",
                          fontSize: "14px",
                          color: "rgb(0, 0, 0)",
                        }}
                      >
                        ZALO - 0983 383 283
                      </p>

                      <p
                        style={{
                          boxSizing: "border-box",
                          margin: "0px 0px 10px",
                          lineHeight: "15px",
                          fontSize: "14px",
                          color: "rgb(0, 0, 0)",
                        }}
                      >
                        ☎ Mr. Thu - 0983 383 283
                      </p>

                      <p
                        style={{
                          boxSizing: "border-box",
                          margin: "0px 0px 10px",
                          lineHeight: "15px",
                          fontSize: "14px",
                          color: "rgb(0, 0, 0)",
                        }}
                      >
                        📧 thu.vo.lhu@gmail.com
                      </p>
                    </div>
                  </Col>

                  <Col md={12} className="mt-40">
                    <h2>
                      <strong>
                        <i className="fa fa-bookmark"></i>
                        &nbsp;&nbsp;Thông tin sản phẩm
                      </strong>
                    </h2>
                    <br />

                    <h3 style={{ color: "red" }}>
                      <span style={{ color: "#ff0000" }}>
                        <strong>ƯU ĐIỂM CỦA SẢN PHẨM:</strong>
                      </span>
                    </h3>
                    
                    <div className="product-description" dangerouslySetInnerHTML={{ __html: product.specifications }} />

                    <p>
                      <strong>
                        <span>HÌNH ẢNH VÀ VIDEO SẢN PHẨM</span>
                      </strong>
                    </p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                  </Col>
                </Row>
              </Container>)}
            </Col>

            <Col md={3}>
                {category && (<RightMenu
                  currentCategory={category.id}
                />)}
            </Col>
          </Row>

          <Row className="clear-fix">
            <Col md={12}>
              <div className="other-products mb-30">
                <h3 className="title">
                  <strong>SẢN PHẨM BẠN CÓ THỂ THÍCH</strong>
                </h3>
              </div>
            </Col>

            <Col md={12}>
              {similars && (<ProductsSlider products={similars}  />)}
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category_alt = getValueAsString(params.category_alt);
  const product_alt = getValueAsString(params.product_alt);

  const category_id = parseInt(category_alt.split("-")[1]);
  const product_id = parseInt(product_alt.split("-")[1]);

  const [category, product, similars] = await Promise.all([
    getCategoryById(category_id),
    getProductById(product_id),
    getSimilarProductsByCategory(category_id, product_id),
  ]);

  return {
    props: {
      category,
      product,
      similars,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async ({ query }) => {
  const paths = [];

  const categories = await getCategories();
  for (const category of categories) {
    const products = await getProductsByCategory(category.id);

    for (const product of products) {
      paths.push({ 
        params: { 
          category_alt: category.alt + "-" + category.id, 
          product_alt: product.alt + "-" + product.id, 
      }});
    }
  }

  return {
    paths,
    fallback: true,
  };
};