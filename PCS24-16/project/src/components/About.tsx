import Lottie from "lottie-react";
import team from "../animations/team.json";
import prediction from "../animations/prediction.json";
import React from "react";

const About=()=> {
  return (
    <div className="container mx-auto">
      {/* new line starts with heading c++ */}
      <div className="grid grid-cols-1 md:grid-cols-2 px-8 mt-7 items-center py">
        <div>
          <h1 className="text-5xl font-bolder text-slate-950 flex justify-center mb-4 md:mb-0">
            Who are we !!!
          </h1>
          <p className="text-lg mt-4 py-3 text-justify text-slate-800">
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
        </div>
        <div className="flex justify-center">
          <Lottie className="max-w-full" animationData={team} />
        </div>
      </div>
      {/* new line ends here */}
      {/* new line starts with heading c++ */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center py">
        <div className="flex justify-center">
          <Lottie className="max-w-full" animationData={prediction} />
        </div>
        <div>
          <h1 className="text-5xl font-bolder text-slate-950 flex justify-center mb-4 md:mb-0">
            What we do !!!
          </h1>
          <p className="text-lg mt-4 py-3 text-justify text-slate-800">
            We are revolutionizing the course recommendation process by
            leveraging the power of predictive analytics to anticipate the most
            popular programming languages of the future.Our platform is designed
            to be user-friendly, adaptive, and constantly evolving to meet the
            changing demands of the language technology industry. Join us in
            shaping the future of education and advancing the field of language
            technology through personalized and adaptive learning.
          </p>
        </div>
      </div>
      {/* new line ends here */}
    </div>
  );
}

export default About;
