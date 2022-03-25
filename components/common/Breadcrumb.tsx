import React, { ReactNode } from "react";
import Link from "next/link";
import {Nav} from "react-bootstrap";

interface BreacrumbProps {
    children?: ReactNode
}

export default function Breadcrumb({children}: BreacrumbProps) {
  return (
    <Nav aria-label="breadcrumb" className="mt-20">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/" scroll={false}>
            <a title="Trang chủ">Trang chủ</a>
          </Link>
        </li>

        <li className="breadcrumb-item">
          <Link href="/products" scroll={false}>
            <a title="Sản phẩm">SẢN PHẨM</a>
          </Link>
        </li>

        {children}
      </ol>
    </Nav>
  );
}
