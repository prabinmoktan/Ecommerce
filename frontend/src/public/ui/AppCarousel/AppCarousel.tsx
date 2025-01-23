import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const images = [
//   { name: "/3.png" },
//   { name: "/4.png" },
//   { name: "/5.png" },
//   { name: "/6.png" },
//   { name: "/7.png" }
// ];
interface carousel {
  items: string[];
  settings?: Settings;
}

const AppCarousel: React.FC<carousel> = ({ items, settings }) => {
  const defaultSettings: Settings = {
    autoplay: true,
    // dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...settings,
  };
  return (
    <Slider {...defaultSettings} className="flex h-1/2">
      {items.map((item, index) => (
        <div
          key={index}
          className="!flex w-screen gap-10 items-center  overflow-hidden"
          style={{ display: "flex", height: "600px" }} // This inline style ensures flexibility inside slides
        >
          <img src={item} alt="..." className="h-full w-full object-cover" />
        </div>
      ))}
    </Slider>
  );
};

export default AppCarousel;
