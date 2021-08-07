import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Link from "next/link";
import Image from "next/image";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

const Main = React.memo(() => (
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
));

export default Main;
