import React from "react";
import Slider from "react-slick";

export default function Sliders({children, dots, length}) {
    const responsive = [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: Math.min(length, 4),
          slidesToScroll: Math.min(length, 4),
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(length, 3),
          slidesToScroll: Math.min(length, 3),
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(length, 2),
          slidesToScroll: Math.min(length, 2),
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: Math.min(length, 1),
          slidesToScroll: Math.min(length, 1),
        }
      }
    ];

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: Math.min(length, 4),
      slidesToScroll: Math.min(length, 4),
      responsive,
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