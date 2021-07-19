import React from "react";
import Slider from "react-slick";

export default function Sliders({children, dots, length}) {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: length > 3 ? 4 : 3,
      slidesToScroll: 3,
      initialSlide: 0,
    };

    return (
      <Slider dots={dots} {...settings}>
          {children}
      </Slider>
    );
};

Sliders.defaultProps = {
  dots: true,
};