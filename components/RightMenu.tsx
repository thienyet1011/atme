import React from "react";
import Link from "next/link";

import classNames from "classnames";

import { CategoryModel } from "../model/Category";

interface RightMenuProps {
  currentCategory: number;
  categories: CategoryModel[];
}

export default function RightMenu({currentCategory, categories}: RightMenuProps) {
  const renderRightMenu = (children: CategoryModel[]) => {
    const items = [];

    {
      children.map((child: CategoryModel) => {
        items.push(
          <li key={child.id} className={classNames("menu-item-58", {
            selected: currentCategory === child.id
          })}>
            {currentCategory !== child.id
              ? (
                <Link href='/products/[category_alt]'
                  as={`/products/${child.alt}-${child.id}`}
                  scroll={false}
                >
                  <a title={child.title} className={classNames({
                    current: currentCategory === child.id
                  })}>{child.title}</a>
                </Link>
              )
              : (
                <a href='#' title={child.title} className={classNames({
                  current: currentCategory === child.id
                })}>{child.title}</a>
              )
            }
          </li>
        );
      });
    }

    return items;
  };

  return (
    <div className="category-tree mb-30">
      <nav className="mainNav">
        <ul>
          <li
            className={classNames("menu-item-10", {
              selected: currentCategory === 0,
            })}
          >
            {currentCategory !== 0 ? (
              <Link href="/products" scroll={false}>
                <a
                  className={classNames({
                    current: currentCategory == 0,
                  })}
                  title="Sản phẩm"
                >
                  SẢN PHẨM
                </a>
              </Link>
            ) : (
              <a
                href="#"
                className={classNames({
                  current: currentCategory == 0,
                })}
                title="Sản phẩm"
              >
                SẢN PHẨM
              </a>
            )}

            <ul>
              {categories &&
                categories.map((item: CategoryModel) => {
                  return (
                    <li
                      key={item.id}
                      className={classNames("menu-item-57", {
                        selected: currentCategory === item.id,
                      })}
                    >
                      {currentCategory !== item.id ? (
                        <Link
                          href="/products/[category_alt]"
                          as={`/products/${item.alt}-${item.id}`}
                          scroll={false}
                        >
                          <a
                            title={item.title}
                            className={classNames({
                              current: currentCategory == item.id,
                            })}
                          >
                            {item.title}
                          </a>
                        </Link>
                      ) : (
                        <a
                          href="#"
                          title={item.title}
                          className={classNames({
                            current: currentCategory == item.id,
                          })}
                        >
                          {item.title}
                        </a>
                      )}

                      {item.children.length > 0 && (
                        <ul>{renderRightMenu(item.children)}</ul>
                      )}
                    </li>
                  );
                })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}

RightMenu.defaultProps = {
  currentCategory: 0
};
