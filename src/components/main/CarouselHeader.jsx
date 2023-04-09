import React from "react";
import { useForm } from "react-hook-form";
import { Carousel } from "react-responsive-carousel";
import "./carouselheader.css";
// Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Link, useNavigate } from "react-router-dom";

const CarouselHeader = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  return (
    <div className="carousel relative">
      <Carousel
        className="carousel-header"
        autoPlay
        infiniteLoop
        interval={5000}
        transitionTime={2}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        swipeable={false}
        // animationHandler={fadeAnimationHandler}
        effect="fade"
      >
        <div
          className=" h-[680px] bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: 'url("./images/andrea.png")' }}
        >
          <div className="max-width-container mx-auto flex justify-end items-end h-full text-right text-white">
            <p style={{ paddingBottom: 32 }}>
              Andrea, <b>Fashion Designer</b>
            </p>
          </div>
        </div>
        <div
          className=" h-[680px] bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: 'url("./images/gabriell.png")' }}
        >
          <div className="max-width-container mx-auto flex justify-end items-end h-full text-right text-white">
            <p style={{ paddingBottom: 32 }}>
              Gabrielle, <b>Video Editor</b>
            </p>
          </div>
        </div>
        <div
          className=" h-[680px] bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: 'url("./images/moon.png")' }}
        >
          <div className="max-width-container mx-auto flex justify-end items-end h-full text-right text-white">
            <p style={{ paddingBottom: 32 }}>
              Moon, <b>Marketing Expert</b>
            </p>
          </div>
        </div>
        <div
          className=" h-[680px] bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: 'url("./images/ritika.png")' }}
        >
          <div className="max-width-container mx-auto flex justify-end items-end h-full text-right text-white">
            <p style={{ paddingBottom: 32 }}>
              Ritika, <b>ShoeMaker and Designer</b>
            </p>
          </div>
        </div>
        <div
          className=" h-[680px] bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: 'url("./images/zach.png")' }}
        >
          <div className="max-width-container mx-auto flex justify-end items-end h-full text-right text-white">
            <p style={{ paddingBottom: 32 }}>
              Zach, <b>Bar Owner</b>
            </p>
          </div>
        </div>
      </Carousel>

      <div className="max-width-container carousel-header-text absolute top-0 right-0 bottom-0 left-0 flex items-center">
        <div className="max-w-[650px]">
          <h1 className="text-white pb-[24px] text-[48px] leading-[56px] font-bold mb-0">
            Find the perfect <i>freelance</i> services for your business
          </h1>
          <div>
            <form
              onSubmit={handleSubmit((data) => {
                console.log({ data });
                if (data.searchText === "") {
                  return;
                }
                navigate(`/worklist?search=${data.searchText}`);
              })}
              className="search-form relative flex"
            >
              <span
                className="absolute top-[16px] left-[16px]"
                aria-hidden="true"
                style={{ width: 16, height: 16 }}
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.8906 14.6531L12.0969 10.8594C12.025 10.7875 11.9313 10.75 11.8313 10.75H11.4187C12.4031 9.60938 13 8.125 13 6.5C13 2.90937 10.0906 0 6.5 0C2.90937 0 0 2.90937 0 6.5C0 10.0906 2.90937 13 6.5 13C8.125 13 9.60938 12.4031 10.75 11.4187V11.8313C10.75 11.9313 10.7906 12.025 10.8594 12.0969L14.6531 15.8906C14.8 16.0375 15.0375 16.0375 15.1844 15.8906L15.8906 15.1844C16.0375 15.0375 16.0375 14.8 15.8906 14.6531ZM6.5 11.5C3.7375 11.5 1.5 9.2625 1.5 6.5C1.5 3.7375 3.7375 1.5 6.5 1.5C9.2625 1.5 11.5 3.7375 11.5 6.5C11.5 9.2625 9.2625 11.5 6.5 11.5Z" />
                </svg>
              </span>

              <input
                className="rounded-l  pl-[44px] mb-0 border-[#dadbdd] flex flex-auto"
                type="text"
                autoComplete="off"
                placeholder='Try "building mobile app"'
                {...register("searchText")}
              />

              <button className="m-0 rounded-r block text-[16px] h-[48px] font-bold px-6 py-3 submit-button text-white bg-green-400">
                Search
              </button>
            </form>
          </div>

          <div className="search-popular flex text-[14px] leading-[27px] font-[600] text-white pt-6">
            Popular:
            <ul className="flex w-full ml-3">
              <li className="mr-3">
                <Link
                  to="/worklist?search=Website Design"
                  className="leading-6 font-[600] text-white py-[1px] px-3
              rounded-[40px] border border-solid border-white transition-all duration-200 hover:text-black hover:bg-white"
                >
                  Website Design
                </Link>
              </li>
              <li className="mr-3">
                <Link
                  to="/worklist?search=WordPress"
                  className="leading-6 font-[600] text-white py-[1px] px-3
              rounded-[40px] border border-solid border-white transition-all duration-200 hover:text-black hover:bg-white"
                >
                  WordPress
                </Link>
              </li>
              <li className="mr-3">
                <Link
                  to="/worklist?search=Logo Design"
                  className="leading-6 font-[600] text-white py-[1px] px-3
              rounded-[40px] border border-solid border-white transition-all duration-200 hover:text-black hover:bg-white"
                >
                  Logo Design
                </Link>
              </li>
              <li className="mr-3">
                <Link
                  to="/worklist?search=Video Editing"
                  className="leading-6 font-[600] text-white py-[1px] px-3
              rounded-[40px] border border-solid border-white transition-all duration-200 hover:text-black hover:bg-white"
                >
                  Video Editing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselHeader;
