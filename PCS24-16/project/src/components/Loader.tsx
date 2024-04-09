import Lottie from "lottie-react";
import React from "react";
import Loading from '../animations/LOADING1.json';

const Loader=() =>{
    return(
        <div className="min-h-screen container mx-auto my-auto overflow-hidden max-w-screen-lg ">
        <div className="z-10" style={{width: '70%', transform: 'translateX(25%)'}}>
            <Lottie animationData={Loading} />
            </div>
        </div>
    )
}
export default Loader;