import React from "react";
import Link from "next/link";

import classNames from "classnames";

import { AppContext } from "../../context";
import { CategoryModel } from "../../model/Category";

interface NavItemProps {
  currentCategory?: number;
  item: CategoryModel;
}

interface RightMenuProps {
  currentCategory?: number;
}

const NavItem = React.memo(({currentCategory, item}: NavItemProps) => (
  <Link
    href={
      currentCategory !== item.id ? `/products/${item.alt}-${item.id}` : "#"
    }
    scroll={false}
  >
    <a
      href={
        currentCategory !== item.id ? `/products/${item.alt}-${item.id}` : "#"
      }
      title={item.title}
      className={classNames({
        current: currentCategory == item.id,
      })}
    >
      {item.title}
    </a>
  </Link>
));

const RightMenu = React.memo(({currentCategory}: RightMenuProps) => {
  const renderSubMenu = (children: CategoryModel[]) => {
    const items = [];

    children.map((child: CategoryModel) => {
      items.push(
        <li
          key={child.id}
          className={classNames("menu-item-58", {
            selected: currentCategory === child.id,
          })}
        >
          <NavItem currentCategory={currentCategory}
            item={child}
          />
        </li>
      );
    });

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
            <Link href={currentCategory !== 0 ? "/products" : "#"} scroll={false}>
              <a
                href={currentCategory !== 0 ? "/products" : "#"}
                className={classNames({
                  current: currentCategory == 0,
                })}
                title="Sản phẩm"
              >
                SẢN PHẨM
              </a>
            </Link>

            <AppContext.Consumer>
              {({categories}) => {
                return (
                  <ul>
                    {categories && categories.map((item: CategoryModel) => {
                        return (
                          <li
                            key={item.id}
                            className={classNames("menu-item-57", {
                              selected: currentCategory === item.id,
                            })}
                          >
                            <NavItem
                              currentCategory={currentCategory}
                              item={item}
                            />
                            
                            {item.children.length > 0 && (
                              <ul>{renderSubMenu(item.children)}</ul>
                            )}
                          </li>
                        );
                      })}
                  </ul>
                  )
              }}
            </AppContext.Consumer>
          </li>
        </ul>
      </nav>
    </div>
  );
});

export default RightMenu;
