import React from "react";
import { NavLink } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found flex flex-wrap container w-full h-full">
      <div className="flex flex-wrap w-full justify-center h-[350px]">
        <div className="w-full text-center mb-3 h-[200px]">
          <span className="text-3xl text-green-700 font-bold text-center">
            Well, this isn't what you were looking for
          </span>
        </div>
        <div className="text-center w-full">
          <NavLink
            to="/"
            className="p-3 border rounded-md bg-white text-lg font-bold"
          >
            Back to Home Page
          </NavLink>
        </div>
      </div>
      <div className="footer-notfound w-full h-[300px]"></div>
    </div>
  );
};

export default NotFound;
