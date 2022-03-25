import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

import { isActive } from "../../../utils";

import { AppContext } from "../../../context";
import { CategoryModel } from "../../../model/Category";

const Menu = React.memo(() => {
  return (
    <AppContext.Consumer>
      {({ categories, route }) => {        
        return (
        <Navbar expand="lg" className="nav">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/" active={isActive("/", route)} title="Trang chủ">
                  Trang chủ
                </Nav.Link>

                <NavDropdown
                  active={isActive("/products", route)}
                  title="Sản phẩm"
                  id="primary-nav-dropdown"
                >
                  {categories &&
                    categories.map((category: CategoryModel) => {
                      return (
                        <React.Fragment key={category.id}>
                          <NavDropdown.Item
                            href={`/products/${category.alt}-${category.id}`}
                            title={category.title}
                            className={
                              category.children.length > 0
                                ? "dropdown-submenu"
                                : ""
                            }
                          >
                            {category.title}
                          </NavDropdown.Item>

                          {category.children &&
                            category.children.map((child: CategoryModel) => {
                              return (
                                <NavDropdown.Item
                                  key={child.id}
                                  href={`/products/${child.alt}-${child.id}`}
                                  title={child.title}
                                  className="dropdown-submenu-item"
                                >
                                  {child.title}
                                </NavDropdown.Item>
                              );
                            })}
                        </React.Fragment>
                      );
                    })}
                </NavDropdown>

                <Nav.Link
                  href="/blog/video"
                  active={isActive("/blog", route)}
                  title="Video"
                >
                  Video
                </Nav.Link>

                <Nav.Link
                  href="/policy"
                  active={isActive("/policy", route)}
                  title="Hướng dẫn mua hàng"
                >
                  Hướng dẫn mua hàng
                </Nav.Link>

                <Nav.Link
                  href="/contact"
                  active={isActive("/contact", route)}
                  title="Liên hệ"
                >
                  Liên hệ
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}}
    </AppContext.Consumer>
  );
});

export default Menu;
