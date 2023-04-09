import React from "react";
import "./maincategories.css";

const MainCategories = () => {
  return (
    <div className="maincategory max-width-container main-categories mx-auto mb-24">
      <h2 className="pb-6 mb-10 text-[32px] leading-[120%] text-[#404145]">
        Explore the marketplace
      </h2>
      <ul className="flex flex-wrap">
        <li className="category-img w-1/5 text-[#222325] text-[16px] font-[500] px-[10px] text-center relative transition-all duration-200">
          <img
            className="w-12 h-12 mx-auto mb-[15px] after:"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
            alt="Graphics & Design"
          />
          Graphics & Design
        </li>
        <li className="category-img w-1/5 text-[#222325] text-[16px] font-[500] lg:w-1/5 md:w-1/3 sm:w-1/2 px-[10px] text-center relative transition-all duration-200">
          <img
            className="w-12 h-12 mx-auto mb-[15px] after:"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
            alt="Digital Marketing"
          />
          Digital Marketing
        </li>
        <li className="category-img w-1/5 text-[#222325] text-[16px] font-[500] lg:w-1/5 md:w-1/3 sm:w-1/2 px-[10px] text-center relative transition-all duration-200">
          <img
            className="w-12 h-12 mx-auto mb-[15px] after:"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
            alt="Writing & Translation"
          />
          Writing & Translation
        </li>
        <li className="category-img w-1/5 text-[#222325] text-[16px] font-[500] lg:w-1/5 md:w-1/3 sm:w-1/2 px-[10px] text-center relative transition-all duration-200">
          <img
            className="w-12 h-12 mx-auto mb-[15px] after:"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
            alt="Video & Animation"
          />
          Video & Animation
        </li>
        <li className="category-img w-1/5 text-[#222325] text-[16px] font-[500] lg:w-1/5 md:w-1/3 sm:w-1/2 px-[10px] text-center relative transition-all duration-200">
          <img
            className="w-12 h-12 mx-auto mb-[15px] after:"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
            alt="Music & Audio"
          />
          Music & Audio
        </li>
        <li className="category-img w-1/5 text-[#222325] text-[16px] font-[500] lg:w-1/5 md:w-1/3 sm:w-1/2 px-[10px] text-center relative transition-all duration-200">
          <img
            className="w-12 h-12 mx-auto mb-[15px] after:"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
            alt="Programming & Tech"
          />
          Programming & Tech
        </li>
        <li className="category-img w-1/5 text-[#222325] text-[16px] font-[500] lg:w-1/5 md:w-1/3 sm:w-1/2 px-[10px] text-center relative transition-all duration-200">
          <img
            className="w-12 h-12 mx-auto mb-[15px] after:"
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
            alt="Business"
          />
          Business
        </li>
        <li className="category-img w-1/5 text-[#222325] text-[16px] font-[500] lg:w-1/5 md:w-1/3 sm:w-1/2 px-[10px] text-center relative transition-all duration-200">
          <img
            className="w-12 h-12 mx-auto mb-[15px] after:"
            // width={48}
            // height={48}
            // style={{ margin: "0 auto 15px" }}
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
            alt="Lifestyle"
          />
          Lifestyle
        </li>
        <li className="category-img w-1/5 text-[#222325] text-[16px] font-[500] lg:w-1/5 md:w-1/3 sm:w-1/2 px-[10px] text-center relative transition-all duration-200">
          <img
            className="w-12 h-12 mx-auto mb-[15px] after:"
            // width={48}
            // height={48}
            // style={{ margin: "0 auto 15px" }}
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
            alt="Data"
          />
          Data
        </li>
      </ul>
    </div>
  );
};

export default MainCategories;
