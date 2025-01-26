import React from "react";
import Slider from "react-slick";
import { logoImages } from "../../../constant";

const LogoCarousel=()=> {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
       {
        logoImages?.map((logo, index)=> (
            <div key={index} className="w-screen relative !flex !justify-center !items-center  h-36 " >
                <img src={logo} alt="..." className="w-36 !mix-blend-multiply"/>
            </div>
        ))
       }
      </Slider>
    </div>
  );
}

export default LogoCarousel;
