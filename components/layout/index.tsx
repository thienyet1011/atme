import React, { ReactNode } from "react";
import Script from "next/script";
import { Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";

import { useAppContext } from "../../context";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { CategoryModel } from "../../model/Category";

interface LayoutProps {
  children?: ReactNode;
  title?: string;
  description?: string;
  categories?: CategoryModel[];
}

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

const Layout = ({ children, title, description, categories }: LayoutProps) => {
  const { currentPage } = useAppContext();

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />

        {description && <meta name="description" content={description} />}
      </Head>

      <header className="landing-page">
        <div className="headerPart">
          {/* Top menu */}
          <div className="header-top top-layout-02">
            <Container>
              <Row>
                <Col sm={12} md={6}>
                  <div className="topbar-left">
                    <div className="topbar-content">
                      <div className="item">
                        <div className="wg-contact">
                          <i className="fa fa-map-marker" />{" "}
                          <span>Nha Trang, Khánh Hòa</span>
                        </div>
                      </div>

                      <div className="item">
                        <div className="wg-contact">
                          <i className="fa fa-phone" />{" "}
                          <span>0983 383 283</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col sm={12} md={6} className="d-none d-sm-block">
                  <div className="topbar-right">
                    <div className="topbar-content">
                      <div className="item icon-social ">
                        <a
                          href="https://www.facebook.com/thu.vo.lhu"
                          className="fa fa-facebook"
                        ></a>

                        <a
                          href="https://twitter.com/amte.vn"
                          className="fa fa-twitter"
                        ></a>

                        <a
                          href="mailto:thu.vo.lhu@gmail.com"
                          className="fa fa-google"
                        ></a>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          {/* Main menu */}
          <div className="header-main-container">
            <Container>
              <Row>
                <Col md={12} lg={8} xl={9} className="logo-site">
                  <div className="logo-main">
                    <Link href="/">
                      <a>
                        <Image
                          src={prefix + '/logo.png'}
                          alt="Logo"
                          width="2364"
                          height="710"
                          layout="responsive"
                        />
                      </a>
                    </Link>
                  </div>

                  <h3 className="intro-header">
                    <p>
                      ATME Việt Nam - Chuyên phân phối thiết bị trên toán quốc
                    </p>
                  </h3>
                </Col>

                <Col md={12} lg={4} xl={3} className="addressBar">
                  <ul>
                    <li className="mb-10">
                      <a href="mailto:thu.vo.lhu@gmail.com" rel="nofollow">
                        <div>
                          <Image
                            src={prefix + '/images/liIco3.png'}
                            alt="email"
                            width="36"
                            height="36"
                            layout="fixed"
                          />
                          <span>thu.vo.lhu@gmail.com</span>
                        </div>
                      </a>
                    </li>

                    <li>
                      <a href="tel:0983 383 283">
                        <div>
                          <Image
                            src={prefix + '/images/liIco2.png'}
                            alt="mobile"
                            width="36"
                            height="36"
                            layout="fixed"
                          />
                          <span>0983 383 283</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </div>

          {/* Main navigator  */}
          <Navbar expand="lg" className="nav">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link
                    href="/"
                    active={currentPage == 0}
                    title="Trang chủ"
                  >
                    Trang chủ
                  </Nav.Link>

                  <NavDropdown
                    active={currentPage == 1}
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
                    active={currentPage == 2}
                    title="Video"
                  >
                    Video
                  </Nav.Link>

                  <Nav.Link
                    href="/policy"
                    active={currentPage == 3}
                    title="Hướng dẫn mua hàng"
                  >
                    Hướng dẫn mua hàng
                  </Nav.Link>

                  <Nav.Link
                    href="/contact"
                    active={currentPage == 4}
                    title="Liên hệ"
                  >
                    Liên hệ
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </header>

      {children}

      <footer>
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center mb-40">
                <div className="center">
                  Công ty TNHH MTV Thương mại điện tử ATME Việt Nam
                </div>
                <div className="center">Phân phối - Thi công - Sửa chữa</div>

                <div className="center">&nbsp;</div>
              </div>

              <div className="col-md-4">
                <div className="container-fluid">
                  <div className="row" data-container="container">
                    <div className="col-xs-3">
                      <span className="fa"></span>
                    </div>

                    <div className="col-xs-9 widget-container">
                      <div>
                        <p className="widget-header">Address</p>
                        <p className="widget-body">Nha Trang, Khánh Hòa</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-center">
                <div className="container-fluid">
                  <div className="row" data-container="container">
                    <div className="col-xs-3">
                      <span className="fa"></span>
                    </div>
                    <div className="col-xs-9 widget-container">
                      <div>
                        <p className="widget-header">Phone</p>
                        <p className="widget-body">
                          <a href="tel:0983 383 283">0983 383 283</a>
                          <br />
                          <a>thu.vo.lhu@gmail.com</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xs-3">
                      <span className="fa fa-dribbble"></span>
                    </div>
                    <div className="col-xs-9 widget-container">
                      <div>
                        <p className="widget-header">Social Network</p>

                        <p className="widget-body"></p>
                        <div className="social-footer">
                          <a
                            href="https://www.facebook.com/thu.vo.lhu"
                            title="Facebook"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span>
                              <i className="fa fa-facebook"></i>
                            </span>
                          </a>
                          <a
                            href="https://twitter.com/amte.vn"
                            title="Twitter"
                            target="_blank"
                            className=""
                            rel="noreferrer"
                          >
                            <span>
                              <i className="fa fa-twitter"></i>
                            </span>
                          </a>
                          <a
                            href="https://www.linkedin.com/amte.vn"
                            title="Linkedin"
                            target="_blank"
                            className=""
                            rel="noreferrer"
                          >
                            <span>
                              <i className="fa fa-linkedin"></i>
                            </span>
                          </a>
                        </div>
                        <p></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="clearMe"></div>
            </div>

            <div className="row copyright-info">
              <div className="col-12">
                <div>Bản quyền thuộc về ATME Vi&#xEA;&#x323;t Nam</div>{" "}
                <div className="originator">
                  {" "}
                  Designed by{" "}
                  <a
                    href="https://guviet.vn/"
                    title="Đơn vị thiết kế website hiện đại - nhanh - đơn giản | www.guviet.vn"
                    target="blank"
                  >
                    Gu Việt
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Script src={prefix + '/js/jquery/jquery-3.3.1.js'} strategy="beforeInteractive" />
      <Script src={prefix + '/js/nav-accordion/index.js'} strategy="beforeInteractive" />
    </React.Fragment>
  );
};

Layout.defaultProps = {
  title:
    "Công ty TNHH MTV Thương mại điện tử ATME Việt Nam - Công ty TNHH MTV Thương mại điện tử ATME Việt Nam",
};

export default Layout;
