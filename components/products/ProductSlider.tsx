import React from "react";
import Image from "next/image";
import Link from "next/link";

import numeral from "numeral";

import Sliders from "../common/Sliders";
import { ProductModel } from "../../model/Product";

interface ProductsSliderProps {
  products: ProductModel[];
};

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function ProductsSlider({products}: ProductsSliderProps) {
    return (
      <Sliders length={products.length}>
        {products &&
          products.map((product: ProductModel) => (
            <div key={product.id}>
              <Link
                href="/products/[category_alt]/[product_alt]"
                as={`/products/${product.categoryAlt}-${product.categoryId}/${product.alt}-${product.id}`}
              >
                <a title={product.title}>
                  <div className="box-slider" style={{ height: "auto" }}>
                    <div className="product">
                      <div className="product-container">
                        <div className="product-img">
                          <Image
                            src={prefix + product.image}
                            width={2568}
                            height={1926}
                            alt={product.alt}
                            layout="responsive"
                          />
                        </div>

                        <div className="product-info">
                          <p className="product-name">{product.title}</p>
                          <div className="cost">
                            {product.showPrice ? (
                              <div>
                                Giá tham khảo:{" "}
                                <span className="price">
                                  {numeral(product.price).format("#,###")} VNĐ
                                </span>
                              </div>
                            ) : (
                              <div>Liên hệ</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
      </Sliders>
    );
};
