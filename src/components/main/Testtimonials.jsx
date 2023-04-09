import React from "react";
import "./testtimonials.css";

const Testtimonials = () => {
  return (
    <div className="testtimonials">
      <section className="text-gray-600 body-font bg-white">
        <div className="max-width-container flex flex-wrap items-center">
          <div className="testtimonials-video w-2/5 bg-gray-100 rounded-lg  flex flex-col ml-auto mt-10 md:mt-0">
            <iframe
              poster="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173395/testimonial-video-still-haerfest.jpg"
              width={"100%"}
              height={280}
              src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/bsncmkwya3nectkensun"
            ></iframe>
          </div>
          <div className="testtimonials-text w-3/5 text-content px-6 py-6">
            <h5 className="title-font font-[400px] text-xl text-[#74767e] mb-4">
              Kay Kim, Co-Founder
            </h5>
            <blockquote className="text-[30px] leading-[44px] text-[#003912]">
              <i>
                "It's extremely exciting that Fiverr has freelancers from all
                over the world — it broadens the talent pool. One of the best
                things about Fiverr is that while we're sleeping, someone's
                working."
              </i>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testtimonials;
