import React from "react";
import Lottie from "lottie-react";
import Loading from "../animations/LOADING2.json";
// import Carousel from "./Carousel";
// import Userpredict from "./Userpredict";
import { useNavigate } from "react-router-dom";
import mainimage from '../Images/img_9.jpg';


function Home() {
  const navigate = useNavigate();
  const redir = (r:string) => {
    console.log("jdsfhg");
    navigate(`/${r}`);
  };
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
      <>
      <div className="grid md:grid-cols-2 gap-4 mt-2 items-center ">
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
      <img className="h-auto max-w-full rounded-full shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30" src={mainimage}></img>
      </div>
      </div>
      </>
      {/* <Carousel /> */}
      <div className="py-4 my-8 text-center md:text-left text-indigo-950  mx-auto flex items-center justify-center">
        <span className="text-5xl py-4 md:text-7xl font-bolder">
          Predictions
        </span>
      </div>
<div className="p-8">
      <div id="current">
        <h2 className="text-3xl font-bolder rounded-2xl px-4 py-3 bg-zinc-100 text-zinc-900 container mx-auto">
          Current
        </h2>
        <p className="text-lg md:text-xl mt-4 py-3 px-2 md:px-5 text-justify text-slate-800">
        📊 A Decade's Insight: Explore a detailed, visual journey through the programming trends of the past 10 years. Understand how languages rose, evolved, and impacted the coding world!
        </p>
        <p className="text-lg md:text-xl mt-4 py-3 px-2 md:px-5 text-justify text-slate-800">
          Python and Typescript will continue to be popular with programmers, while Java
          and PHP will slip in popularity. Here's a look at what to expect from
          the top programming languages in 2023.Python will continue to
          dominate, PHP will keep slipping in popularity, and we might see at
          least slightly less interest in Java. That, in a nutshell, summarizes
          some of the key programming language trends that are likely to play
          out in 2023.
        </p>
        <button className="text-lg md:text-2xl ml-3 font-bolder bg-black my-8 rounded-xl py-5 px-5 w-full md:w-auto" onClick={() => redir("Userpredict")}>
          Current Prediction
        </button>
      </div>
      <div id="future">
        <h2 className="text-3xl font-bolder rounded-2xl px-4 py-3 bg-zinc-100 text-zinc-900 container mx-auto">
          FUTURE
        </h2>
        <p className="text-lg md:text-xl mt-4 py-3 px-2 md:px-5 text-justify text-slate-800">
        🔮 Predicting Tomorrow: Get ahead of the curve by viewing what the future of programming might look like. Our predictions sketch out the next 2-3 years of language trends.
        </p>
        <p className="text-lg md:text-xl mt-4 py-3 px-2 md:px-5 text-justify text-slate-800">
        🚀 Stay Ahead: Planning a new project or looking to upskill? Know what's coming next and align your strategies for a brighter tech future!

        </p>
        <button className="text-lg md:text-2xl ml-3 font-bolder bg-black my-8 rounded-xl py-5 px-5 w-full md:w-auto"  onClick={() => redir("Predict")}>
          FUTURE Prediction
        </button>
      </div>
      <div id="userpredict">
        <h2 className="text-3xl font-bolder rounded-2xl px-4 py-3 mt-4 bg-zinc-100 text-zinc-900 container mx-auto">
          User
        </h2>
        <p className="text-lg md:text-xl mt-4 py-3 px-2 md:px-5 text-justify text-slate-800">
        📢 Your Voice, Visualized: Dive deep into the collective insights of our user community. Understand what languages they currently excel in and which ones they're eyeing for the future.
        </p>
        <p className="text-lg md:text-xl mt-4 py-3 px-2 md:px-5 text-justify text-slate-800">
        🌟 Current Mastery vs. Future Aspirations: Separate charts showcase the percentage of users proficient in specific languages and the ones they're eager to learn next. Be a part of this democratic data revelation!

        </p>
        <p className="text-lg md:text-xl mt-4 py-3 px-2 md:px-5 text-justify text-slate-800">
        🤝 Shared Journeys: Your learning journey is unique, but you're not alone. Discover what paths others are taking and perhaps find new inspirations for your next coding adventure.

        </p>
        <button
          className="text-lg md:text-2xl ml-3 font-bolder bg-black rounded-xl py-5 px-5 my-8 w-full md:w-auto"
          onClick={() => redir("Userpredictdb")}
        >
          User Prediction
        </button>
      </div>
    
   </div>
    </>
  );
}

export default Home;
