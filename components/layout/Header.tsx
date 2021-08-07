import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Header = React.memo(() => (
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
));

export default Header;
