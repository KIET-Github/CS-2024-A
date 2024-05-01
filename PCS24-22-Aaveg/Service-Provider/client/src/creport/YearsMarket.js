import React, { useEffect, useState } from "react";

const YearsMarket = () => {
  const [customerSatisfaction, setCustomerSatisfaction] = useState(0);
  const targetCustomerSatisfaction = 3;

  useEffect(() => {
    let interval;

    const updateValues = () => {
      let currentCustomerSatisfaction = customerSatisfaction;
      const incrementRate = 1;

      interval = setInterval(() => {
        currentCustomerSatisfaction += incrementRate;
        setCustomerSatisfaction(currentCustomerSatisfaction);

        if (currentCustomerSatisfaction >= targetCustomerSatisfaction) {
          clearInterval(interval);
        }
      }, 30);
    };

    const handleScroll = () => {
      // Check if the person has started scrolling
      if (window.scrollY > 0) {
        updateValues();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the interval and remove event listener when the component is unmounted
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };// eslint-disable-next-line
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div className="w-60 flex-col justify-center align-middle my-2 mx-8">
      <img src="./icons/calendars.png" className="w-36 flex justify-center align-middle ml-12" alt="Calendar" />
      <p className="text-center font-bold text-4xl my-1">{customerSatisfaction}</p>
      <hr class="w-12 h-2 mx-auto my-2 bg-gray-200 border-0 rounded md:my-2 "></hr>
      <div className=" text-xl text-center text-slate-600">Years In Market</div>
    </div>
  );
};

export default YearsMarket;
