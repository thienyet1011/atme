import React, { ReactNode } from "react";
import Link from "next/link";
import {Nav} from "react-bootstrap";

interface MainNavProps {
    children?: ReactNode
}

export default function MainNav({children}: MainNavProps) {
  return (
    <Nav aria-label="breadcrumb" className="mt-20">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/">
            <a title="Trang chủ">Trang chủ</a>
          </Link>
        </li>

        <li className="breadcrumb-item">
          <Link href="/products">
            <a title="Sản phẩm">SẢN PHẨM</a>
          </Link>
        </li>

        {children}
      </ol>
    </Nav>
  );
}
