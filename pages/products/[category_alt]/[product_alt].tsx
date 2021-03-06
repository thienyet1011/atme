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
import MainNav from "../../../components/common/Breadcrumb";
import RightMenu from "../../../components/common/RightMenu";
import ProductSlider from "../../../components/products/ProductSlider";

export interface ProductProps {
  category: CategoryModel;
  product: ProductModel;
  similars: ProductModel[];
};

export default function Product({category, product, similars}: ProductProps) {
  return (
    <Layout>
      <div id="render-body">
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
                            Gia?? tham kha??o:
                            <span className="price">{numeral(product.price).format("#,###")} VN??</span>
                          </p>
                        )
                        : (
                          <p className="product-detail-cost">
                            Gia?? li??n h???
                          </p>
                        )
                      }
                    </div>

                    <div className="product-info-detail mt-20">
                    {product.showPrice
                        ? (
                          <h4 className="product-description-mobile">
                            Gi?? tham kh???o:
                            <span className="w-50">{numeral(product.price).format("#,###")} VN??</span>
                          </h4>
                        )
                        : (
                          <h4 className="product-description-mobile">
                            Gia?? li??n h???
                          </h4>
                        )
                      }

                      <h4 className="product-description">M?? t???</h4>

                      <div>
                        <span style={{ fontSize: "14px" }}>
                          <strong>T??NH TR???NG: </strong>
                          {product.status
                            ? (<strong>(c??n h??ng) {product.quantity} c??i</strong>)
                            : (<strong>(h???t h??ng)</strong>)
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
                        <strong>C??CH ?????T H??NG:</strong>:
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
                        ??? Mr. Thu - 0983 383 283
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
                        ???? thu.vo.lhu@gmail.com
                      </p>
                    </div>
                  </Col>

                  <Col md={12} className="mt-40">
                    <h2>
                      <strong>
                        <i className="fa fa-bookmark"></i>
                        &nbsp;&nbsp;Th??ng tin s???n ph???m
                      </strong>
                    </h2>
                    <br />

                    <h3 style={{ color: "red" }}>
                      <span style={{ color: "#ff0000" }}>
                        <strong>??U ??I???M C???A S???N PH???M:</strong>
                      </span>
                    </h3>
                    
                    <div className="product-description" dangerouslySetInnerHTML={{ __html: product.specifications }} />

                    <p>
                      <strong>
                        <span>H??NH ???NH V?? VIDEO S???N PH???M</span>
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
                  <strong>SA??N PH????M BA??N CO?? TH???? THI??CH</strong>
                </h3>
              </div>
            </Col>

            <Col md={12}>
              {similars && (<ProductSlider products={similars}  />)}
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