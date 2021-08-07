import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Row, Col } from "react-bootstrap";

import numeral from "numeral";

import Pagination from "../common/Pagination";

import { ProductModel } from "../../model/Product";

interface ProductsContainerProps {
  products?: ProductModel[];
  totalPages: number;
  query?: any;
  pathname: string;
}

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function ProductsContainer({
  products,
  totalPages,
  query,
  pathname,
}: ProductsContainerProps) {
  return (
    <React.Fragment>
      <Row>
        {products &&
          products.map((product: ProductModel) => {
            return (
              <Col key={product.id} md={4} className="product-item">
                <div className="produc-item-img">
                  <ProductImage
                    product_id={product.id}
                    title={product.title}
                    image={prefix + product.image}
                    product_alt={product.alt}
                    category_id={product.categoryId}
                    category_alt={product.categoryAlt}
                  />
                </div>

                <div className="product-item-info">
                  <ProductTitle
                    product_id={product.id}
                    title={product.title}
                    product_alt={product.alt}
                    category_id={product.categoryId}
                    category_alt={product.categoryAlt}
                  />

                  <ProductFooter
                    showPrice={product.showPrice}
                    price={product.price}
                  />
                </div>
              </Col>
            );
          })}
      </Row>

      {/* PAGINATION */}
      <Pagination query={query} pathname={pathname} totalPages={totalPages} />
    </React.Fragment>
  );
}

ProductsContainer.defaultProps = {
  products: [],
  totalPages: 0,
};

interface ProductImageProps {
  product_id: number;
  title: string;
  image: string;
  product_alt: string;
  category_id: number;
  category_alt: string;
}

const ProductImage = ({
  product_id,
  title,
  image,
  product_alt,
  category_id,
  category_alt,
}: ProductImageProps) => {
  return (
    <Link
      href="/products/[category_alt]/[product_alt]"
      as={`/products/${category_alt}-${category_id}/${product_alt}-${product_id}`}
    >
      <a title={title}>
        <Image
          src={image}
          alt={product_alt}
          width={2568}
          height={1926}
          layout="responsive"
        />
      </a>
    </Link>
  );
};

interface ProductTitleProps {
  product_id: number;
  title: string;
  product_alt: string;
  category_id: number;
  category_alt: string;
}

const ProductTitle = ({
  product_id,
  title,
  product_alt,
  category_id,
  category_alt,
}: ProductTitleProps) => {
  return (
    <div className="product-item-name">
      <Link
        href="/products/[category_alt]/[product_alt]"
        as={`/products/${category_alt}-${category_id}/${product_alt}-${product_id}`}
      >
        <a title={title}>{title}</a>
      </Link>
    </div>
  );
};

interface ProductFooterProps {
  showPrice: boolean;
  price: number;
}

const ProductFooter = ({ showPrice, price }: ProductFooterProps) => {
  return (
    <div className="product-item-text mb-10">
      {showPrice ? (
        <div>
          Giá tham khảo:{" "}
          <span className="price">{numeral(price).format("#,###")} VNĐ</span>
        </div>
      ) : (
        <div>Liên hệ</div>
      )}
    </div>
  );
};
