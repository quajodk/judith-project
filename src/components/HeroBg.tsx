import Slider from "react-slick";
import SliderImg from "../assets/images/slider.jpeg";
import Slider1Img from "../assets/images/slider1.jpeg";

interface Props {}

const HeroBg = (props: Props) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Slider {...settings}>
      <div aria-hidden="true" className="sm:hidden">
        <div className="flex-1 relative w-full bg-gray-800 opacity-50">
          <div className="inset-0 overflow-hidden" style={{ height: 500 }}>
            <img
              src={SliderImg}
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="inset-0 bg-gray-900 opacity-50" />
        </div>
      </div>
      <div aria-hidden="true" className="sm:hidden">
        <div className="flex-1 relative w-full bg-gray-800 opacity-50">
          <div className="inset-0 overflow-hidden" style={{ height: 500 }}>
            <img
              src={Slider1Img}
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="inset-0 bg-gray-900 opacity-50" />
        </div>
      </div>
    </Slider>
  );
};

export default HeroBg;
