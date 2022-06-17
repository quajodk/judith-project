import Slider from "react-slick";
import SliderImg from "../assets/images/slider.jpeg";
import Slider1Img from "../assets/images/slider1.jpeg";
import Banner1 from "../assets/images/banner_1.jpeg";
import Banner2 from "../assets/images/banner_2.jpeg";
import { useMediaQuery } from "react-responsive";

interface Props {}

const HeroBg = (props: Props) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

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
        <div className="flex-1 relative w-full">
          <div
            className="inset-0 overflow-hidden"
            style={{ height: isTabletOrMobile ? 150 : 500 }}
          >
            <img
              src={Banner2}
              alt=""
              width={isTabletOrMobile ? "414px" : "100%"}
              className="object-center object-cover"
            />
          </div>
          {/* <div className="inset-0 bg-gray-900 opacity-20" /> */}
        </div>
      </div>
      <div aria-hidden="true" className="sm:hidden">
        <div className="flex-1 relative w-full">
          <div
            className="inset-0 overflow-hidden"
            style={{
              height: isTabletOrMobile ? 150 : 500,
            }}
          >
            <img
              src={Banner1}
              alt=""
              width={isTabletOrMobile ? "414px" : "100%"}
              className="object-center object-cover"
            />
          </div>
          {/* <div className="inset-0 bg-gray-900 opacity-20" /> */}
        </div>
      </div>

      <div aria-hidden="true" className="sm:hidden">
        <div className="flex-1 relative w-full">
          <div
            className="inset-0 overflow-hidden"
            style={{ height: isTabletOrMobile ? 150 : 500 }}
          >
            <img
              src={SliderImg}
              alt=""
              width={isTabletOrMobile ? "414px" : "100%"}
              className="object-center object-cover"
            />
          </div>
          {/* <div className="inset-0 bg-gray-900 opacity-20" /> */}
        </div>
      </div>
      <div aria-hidden="true" className="sm:hidden">
        <div className="flex-1 relative w-full">
          <div
            className="inset-0 overflow-hidden"
            style={{ height: isTabletOrMobile ? 150 : 500 }}
          >
            <img
              src={Slider1Img}
              alt=""
              width={isTabletOrMobile ? "414px" : "100%"}
              className="object-center object-cover"
            />
          </div>
          {/* <div className="inset-0 bg-gray-900 opacity-20" /> */}
        </div>
      </div>
    </Slider>
  );
};

export default HeroBg;
