import SearchBar from "../SearchBar/SearchBar"

const Banner = () => {
  return (
    <div className=" flex flex-wrap justify-center ">
      <div className=" flex justify-center w-1/2 ">
        <img className=" w-11/12" src="./Images/banner2.png" alt="banner"></img>

      </div>
      <div>
        <h1 className=" text-center mt-10 mb-6 text-7xl text-slate-800 font-bold  " style={{ fontFamily: 'Bebas Neue' }}>SERVICELY</h1>
        <h2 className=" text-center mt-3  text-4xl text-slate-600 font-semibold ">Quality home services,</h2>
        <h2 className=" text-center  mb-7 text-4xl text-slate-600 font-semibold ">on demand</h2>
        <h3 className=" text-center mt-3 text-2xl text-neutral-900 font-semibold ">Experienced, hand-picked Professionals </h3>
        <h3 className=" text-center mb-8 text-2xl text-neutral-900 font-semibold ">to serve you at your doorstep</h3>
        <form className="flex justify-center align-middle mt-5  ">
         <SearchBar/>
        </form>

      </div>
    </div>



  )

};

export default Banner;
