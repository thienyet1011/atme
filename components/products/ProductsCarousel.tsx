import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Carousel, Container, Row, Col } from "react-bootstrap";

import Carousels from "../Carousels";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function ProductsCarousel() {
  return (
    <Carousels>
      <Container>
        <Row style={{ minHeight: "290px" }}>
          <Col md={4}>
            <Link href="/product/thiet-bi-may-rang-cafe/bo-dieu-khien-khong-day-artisan-coffee-wifi-118">
              <a
                className="ls-13-a"
                title="BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI"
              >
                <Image
                  className="ls-s3 si ls-13-img"
                  src={prefix + '/products/PI/EU_PSU_BLACK-800x800.jpg'}
                  alt="BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
            </Link>
          </Col>

          <Col md={8}>
            <Carousel.Caption>
              <h5>BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI</h5>
              <small>KẾT NỐI KHÔNG DÂY WIFI MÁY RANG VÀ MÁY TÍNH ...</small>
            </Carousel.Caption>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row style={{ minHeight: "290px" }}>
          <Col md={4}>
            <Link href="/product/thiet-bi-may-rang-cafe/bo-dieu-khien-khong-day-artisan-coffee-wifi-118">
              <a
                className="ls-13-a"
                title="BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI"
              >
                <Image
                  className="ls-s3 si ls-13-img"
                  src={prefix + '/products/PI/RPI-CASE-4W-800x800.jpg'}
                  alt="BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
            </Link>
          </Col>

          <Col md={8}>
            <Carousel.Caption>
              <h5>BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI</h5>
              <small>KẾT NỐI KHÔNG DÂY WIFI MÁY RANG VÀ MÁY TÍNH ...</small>
            </Carousel.Caption>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row style={{ minHeight: "290px" }}>
          <Col md={4}>
            <Link href="/product/thiet-bi-may-rang-cafe/bo-dieu-khien-khong-day-artisan-coffee-wifi-118">
              <a
                className="ls-13-a"
                title="BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI"
              >
                <Image
                  className="ls-s3 si ls-13-img"
                  src={prefix + '/products/PI/RPI-400-US_main-800x800.jpg'}
                  alt="BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI"
                  layout="fill"
                  objectFit="cover"
                />
              </a>
            </Link>
          </Col>

          <Col md={8}>
            <Carousel.Caption>
              <h5>BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI</h5>
              <small>KẾT NỐI KHÔNG DÂY WIFI MÁY RANG VÀ MÁY TÍNH ...</small>
            </Carousel.Caption>
          </Col>
        </Row>
      </Container>
    </Carousels>
  );
}
