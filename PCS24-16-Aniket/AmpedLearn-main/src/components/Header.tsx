import React, { useState } from "react";
import "styles/Header.css";
import { Link } from "react-router-dom";


const Header = () => {
 
  return (
    <div className="rounded-2xl px-4 py-3 text-zinc-900 mx-auto flex items-center justify-center">
    <Link to="/" className="text-5xl text-slate-900 font-bolder px-10 p-2">
      AMPED LEARNING
    </Link>

    <div className="ml-auto flex gap-5 text-3xl font-primary">
      {/* <span className="rounded-xl bg-zinc-900 text-zinc-100 p-2">Projects</span>*/}

      <select
        className="rounded-xl bg-zinc-900 text-zinc-100 p-2"
        onChange={(e) => {
          const selectedValue = e.target.value;
          const section = document.getElementById(selectedValue);
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <option value="" disabled selected>
          Predictions
        </option>
        <option value="userpredict">USER</option>
        <option value="current">Current</option>
        <option value="future">Future</option>
      </select>
      <Link to="/videos" className="rounded-xl bg-zinc-900 text-zinc-100 p-2">
        Videos
      </Link>
      <Link to="/about" className="rounded-xl bg-zinc-900 text-zinc-100 p-2">
        About
      </Link>
      <Link
        to="/Blog"
        className="rounded-xl bg-zinc-900 text-zinc-100 p-2"
      >
        Blogs
      </Link>
      <Link
        to="/contact"
        className="rounded-xl bg-zinc-900 text-zinc-100 p-2"
      >
        Feedback
      </Link>
    </div>
  </div>
  );
};

export default Header;
