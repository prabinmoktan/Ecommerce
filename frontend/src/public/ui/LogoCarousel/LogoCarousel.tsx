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
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          padding: 10,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
       {
        logoImages?.map((logo, index)=> (
            <div key={index} className="w-screen relative !flex !justify-center !items-center  h-36 " >
                <img src={logo} alt="..." className=" !mix-blend-multiply w-36 " />
            </div>
        ))
       }
      </Slider>
    </div>
  );
}

export default LogoCarousel;
