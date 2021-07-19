import React from "react";
import Image from "next/image";
import Link from "next/link";

import Sliders from "../Sliders";
import { CategoryModel } from "../../model/Category";

export interface CategoriesSliderProps {
  categories: CategoryModel[];
}

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function CategoriesSlider({categories}: CategoriesSliderProps) {
    return (
      <Sliders dots={false} length={categories.length}>
        {categories && categories.map((category: CategoryModel) => {      
          
          return (
            <div key={category.id} className="category-slider-item">
                <Link href="/products/[category_alt]-[id]"
                  as={`/products/${category.alt}-${category.id}`}>
                  <a title={category.title}>
                    <Image
                      src={prefix + category.image}
                      alt={category.title}
                      width="2568"
                      height="1926"
                      layout="responsive"
                    />
                    <div className="caption">{category.title}</div>
                  </a>
                </Link>
            </div>
          );
        })}
      </Sliders>
    );
};
