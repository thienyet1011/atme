import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Carousel, Container, Row, Col } from "react-bootstrap";

import Carousels from "../Carousels";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function ProductsCarousel() {
  return (
    <Carousels>
      <Carousel.Item>
        <Row style={{ minHeight: "200px" }}>
          <Col md={4}>
            <Link href="/product/thiet-bi-may-rang-cafe/bo-dieu-khien-khong-day-artisan-coffee-wifi-118">
              <a
                className="ls-13-a"
                title="BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI"
              >
                <Image
                  className="ls-s3 si ls-13-img"
                  src={prefix + '/products/Carousel/RPI-SOUND-MAKE-NOISE-800x800.png'}
                  alt="BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI"
                  layout="responsive"
                  width={800}
                  height={800}
                />
              </a>
            </Link>
          </Col>

          <Col md={8}>
            <Carousel.Caption className="d-none d-sm-flex">
              <h5>BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI</h5>
              <small>KẾT NỐI KHÔNG DÂY WIFI MÁY RANG VÀ MÁY TÍNH ...</small>
            </Carousel.Caption>
          </Col>
        </Row>
        
        <Carousel.Caption className="d-block d-sm-none">
            <h5>BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI</h5>
            <small>KẾT NỐI KHÔNG DÂY WIFI MÁY RANG VÀ MÁY TÍNH ...</small>
          </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Row style={{ minHeight: "200px" }}>
          <Col md={4}>
            <Link href="/product/thiet-bi-may-rang-cafe/bo-dieu-khien-khong-day-artisan-coffee-wifi-118">
              <a
                className="ls-13-a"
                title="BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI"
              >
                <Image
                  className="ls-s3 si ls-13-img"
                  src={prefix + '/products/Carousel/RPD-TV-MOUNT-800x800.png'}
                  alt="BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI"
                  layout="responsive"
                  width={800}
                  height={800}
                />
              </a>
            </Link>
          </Col>

          <Col md={8}>
            <Carousel.Caption className="d-none d-sm-flex">
              <h5>BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI</h5>
              <small>KẾT NỐI KHÔNG DÂY WIFI MÁY RANG VÀ MÁY TÍNH ...</small>
            </Carousel.Caption>
          </Col>
        </Row>
        
        <Carousel.Caption className="d-block d-sm-none">
            <h5>BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI</h5>
            <small>KẾT NỐI KHÔNG DÂY WIFI MÁY RANG VÀ MÁY TÍNH ...</small>
          </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Row style={{ minHeight: "200px" }}>
          <Col md={4}>
            <Link href="/product/thiet-bi-may-rang-cafe/bo-dieu-khien-khong-day-artisan-coffee-wifi-118">
              <a
                className="ls-13-a"
                title="BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI"
              >
                <Image
                  className="ls-s3 si ls-13-img"
                  src={prefix + '/products/Carousel/RPI-400-US_main-800x800.png'}
                  alt="BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI"
                  layout="responsive"
                  width={800}
                  height={800}
                />
              </a>
            </Link>
          </Col>

          <Col md={8}>
            <Carousel.Caption className="d-none d-sm-flex">
              <h5>BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI</h5>
              <small>KẾT NỐI KHÔNG DÂY WIFI MÁY RANG VÀ MÁY TÍNH ...</small>
            </Carousel.Caption>
          </Col>
        </Row>
        
        <Carousel.Caption className="d-block d-sm-none">
            <h5>BỘ ĐIỀU KHIỂN KHÔNG DÂY ARTISAN COFFEE WIFI</h5>
            <small>KẾT NỐI KHÔNG DÂY WIFI MÁY RANG VÀ MÁY TÍNH ...</small>
          </Carousel.Caption>
      </Carousel.Item>
    </Carousels>
  );
}
