import React, { useEffect, useRef } from "react";
import { Typography } from "@material-tailwind/react";
import { gsap } from "gsap";
import HomeSvg from "../assets/home.svg";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomePage.css";

const WelcomePage = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;
    const svgContainer = container.querySelector(".svg-container");
    const textContainer = container.querySelector(".text-container");

    gsap.fromTo(
      [svgContainer, textContainer],
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        onComplete: () => {
          container.style.justifyContent = "space-between";
        },
      }
    );
  }, []);
  const handleAnalyzeClick = () => {
    navigate("/map");
  };

  return (
    <div className="bg-white h-screen text-white">
      <div className="container" ref={containerRef}>
        <div className="text-container mb-20 mt-12">
          <Typography variant="h2" className="text-4xl font-bold">
            RoadWise
          </Typography>
          <Typography variant="paragraph" className="mt-4 text-lg">
            Road Accident Analysis and Classification System
          </Typography>
          <Typography variant="paragraph" className="mt-4 text-lg">
            Our system analyzes road accidents to provide valuable information
            for informed decision-making. Stay updated on road safety trends,
            identify high-risk areas, and drive responsibly.
          </Typography>
          <Typography variant="paragraph" className="mt-2 text-lg font-bold">
            Drive safe. Drive wise.
          </Typography>
          <button
            className="analyze-button bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-3"
            onClick={handleAnalyzeClick}
          >
            Analyze <FaArrowRight className="ml-1" />
          </button>
        </div>
        <div className="svg-container">
          <img src={HomeSvg} alt="Home" className="h-auto w-80" />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
