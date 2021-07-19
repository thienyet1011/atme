import React from "react";
import { Carousel } from "react-bootstrap";

export default function Carousels({children}) {
  return (
    <Carousel>
      {children}
    </Carousel>
  );
};