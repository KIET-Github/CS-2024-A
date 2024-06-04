import Lottie from "lottie-react";
import Signal from "../animations/LOADING2.json";
import Review from "./Reviews";
import React from "react";
import Form from "./Form";

const Contact=()=> {
  return (
    <div className="min-h-screen">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex justify-center md:justify-end">
          <Lottie animationData={Signal} />
        </div>
        <div className="p-8 md:p-0">
<Form/>
        </div>
      </div>
      <div className=" my-8 px-4 sm:px-6 lg:px-8">
        <Review/>
      </div>
    </div>
  );
}

export default Contact;
