import React from "react";
import Lottie from "lottie-react";
import Loading from "../animations/LOADING2.json";
import { useNavigate } from "react-router-dom";
import mainimage from '../Images/img_9.jpg';
import '../styles/index.css';

const ProgrammingTrends = () => {
  const navigate = useNavigate();

  const handleRedirect = (page: any) => {
    navigate(`/${page}`);
  };
  return (
    <div className="trends-section mb-4 pb-4">
      {/* <div className="trends-line"></div> */}
      <div className="trends-container mb-4 pb-4">
        <div className="trend-card" onClick={() => handleRedirect('Userpredict')}>
          <div className="card-inner">
            <div
              className="card-front"
              style={{
                color: "white",
                overflow: "hidden",
                height: "100%" // Add this line to set a fixed height
              }}
            >
              <button className="redirect-button">Current Prediction</button>
              <div className="leaf-pattern"></div>
            </div>
            <div className="card-back bg-teal-600 text-black pb-2">
              <p>
                📊 A Decade's Insight: Explore a detailed, visual journey through the
                programming trends of the past 10 years. Understand how languages rose,
                evolved, and impacted the coding world!
              </p>
            </div>
          </div>

        </div>

        <div className="trend-card" onClick={() => handleRedirect('Predict')}>
          <div className="card-inner">
            <div
              className="card-front"
              style={{
                color: "white",
                overflow: "hidden",
                height: "100%" // Add this line to set a fixed height
              }}
            >
              <button className="redirect-button">Future Prediction</button>
              <div className="leaf-pattern-1"></div>
            </div>
            <div className="card-back bg-teal-600 text-black pb-2">
              <p>🔮 Predicting Tomorrow: Get ahead of the curve by viewing what the future of programming might look like. Our predictions sketch out the next 2-3 years of language trends.</p>
              <p>🚀 Stay Ahead: Planning a new project or looking to upskill? Know what's coming next and align your strategies for a brighter tech future!</p>
            </div>
          </div>
        </div>
        <div className="trend-card" onClick={() => handleRedirect('Userpredictdb')}>
          <div className="card-inner">
            <div
              className="card-front"
              style={{
                color: "white",
                overflow: "hidden",
                height: "100%" // Add this line to set a fixed height
              }}
            >
              <button className="redirect-button">User Prediction</button>
              <div className="leaf-pattern-2"></div>
            </div>
            <div className="card-back bg-teal-600 text-black pb-2">
              <p>📢 Your Voice, Visualized: Dive deep into the collective insights of our user community. Understand what languages they currently excel in and which ones they're eyeing for the future.</p>
              <p>🌟 Current Mastery vs. Future Aspirations: Separate charts showcase the percentage of users proficient in specific languages and the ones they're eager to learn next. Be a part of this democratic data revelation!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Home() {

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 mt-4 items-center justify-center">
        <Lottie animationData={Loading} className="w-full" />
        <div>
          <h1 className="text-5xl md:text-7xl text-center md:text-left text-zinc-900 font-primary font-bold">
            Find What to learn!
          </h1>
          <p className="text-2xl md:text-3xl mt-5 text-center md:text-left"></p>
        </div>
      </div>
      <div className="py-3 text-center md:text-left text-indigo-950  mx-auto flex items-center justify-center">
        <span className="text-5xl md:text-7xl font-bolder">LANGUAGES</span>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-2 items-center">
        <p className="text-lg md:text-xl mt-4 py-3 px-2 md:px-10 text-justify text-slate-800">
          Programming languages are at the heart of software development and
          computer science. They are the tools that enable programmers to
          create, design and operate software applications, websites, and
          other digital tools. There are hundreds of programming languages
          available today, each with their own strengths and weaknesses.
          Learning a programming language can be challenging, but it is a
          skill that is in high demand across a wide range of industries, from
          finance to healthcare, to entertainment and beyond. Whether you are
          a beginner or an experienced developer, there is always something
          new to learn in the world of programming languages. At our project,
          we are committed to helping students stay ahead of the curve with
          emerging language technologies by providing programming language
          recommendations based on predictive analytics. Join us in exploring
          the exciting world of programming languages and take your skills to
          the next level.
        </p>
        <div>
          <img className="h-auto max-w-full rounded-full shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30" src={mainimage} alt="Main" />
        </div>
      </div>
      <div className="py-4 my-8 text-center md:text-left text-indigo-950  mx-auto flex items-center justify-center">
        <span className="text-5xl py-4 md:text-7xl font-bolder">
          Predictions
        </span>
      </div>
      <ProgrammingTrends />
    </>
  );
}

export default Home;
