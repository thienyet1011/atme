import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Col } from "react-bootstrap";

import numeral from 'numeral';

import { ProductModel } from "../../model/Product";

export interface FeatureProductsProps {
  products: ProductModel[];
}

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function FeatureProducts({products}: FeatureProductsProps) {
  return (
    <React.Fragment>
      {products &&
        products.map((product: ProductModel) => {
          return (
            <Col key={product.id} sm={12} md={3} lg={4}>
              <Link
                href="/products/[category_alt]/[product_alt]"
                as={`/products/${product.categoryAlt}-${product.categoryId}/${product.alt}-${product.id}`}
              >
                <a title={product.title}>
                  <div className="productPriority">
                    <div className="productPriority-img">
                      <Image
                        src={prefix + product.image}
                        alt={product.alt}
                        width="2568"
                        height="1926"
                        layout="responsive"
                      />
                    </div>

                    <p className="productPriority-name">{product.title.toUpperCase()}</p>

                    <div className="productPriority-cost">
                      {product.showPrice ? (
                        <div>
                          Giá tham khảo:{" "}
                          <span className="price">{numeral(product.price).format('#,###')} VNĐ</span>
                        </div>
                      ) : (
                        <div>Liên hệ</div>
                      )}
                    </div>
                  </div>
                </a>
              </Link>
            </Col>
          );
        })}
    </React.Fragment>
  );
}
