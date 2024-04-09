// import React from 'react'
// import {Doughnut} from 'react-chartjs-2'
// import {Chart,ArcElement} from 'chart.js'
// import Labels from './Labels';
// import {default as api} from '../store/apiSlice';

// import {chart_Data} from '../helper/helper'

// Chart.register(ArcElement);


// function Graph(props) {
//   const{data,isFetching,isSuccess,isError}= api.useGetLabelsQuery();
//    let graphData;
//    if(isFetching)
//    {
//      graphData=<div>fetching</div>
//    }else if(isSuccess)
//    {
//     graphData=<Doughnut {...chart_Data(data,props.language) }></Doughnut> 
//    }else if(isError)
//    {
//       graphData=<div>Error</div>
//    }


//   return (
//     <>
//     <div className="flex justify-content px-5 mx-auto">
//     <div className='item'>
//     <div className="chart relative">
//     {graphData}
//       <h3 className='px-10 font-bold absolute top-40'>Total</h3>
//       </div>
//       <div className='flex flex-col py-10 gap-4'>
//         <Labels fog={props.language}/>
//       </div>
//       </div>
//     </div>
//     </>
//   )
// }

// export default Graph;
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Labels from './Labels';
import { default as api } from '../store/apiSlice';
import { chart_Data } from '../helper/helper';


function Graph(props:any) {
    // console.log("propsingraph",props.language);
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery({});
  let graphData;
  if (isFetching) {
    graphData = <div className="text-gray-500 text-center">Fetching...</div>;
  } else if (isSuccess) {
    console.log("hgtyt",chart_Data(data, props.language,null), )
    graphData = <Doughnut {...chart_Data(data, props.language,null)}/>;

  } else if (isError) {
    graphData = <div className="text-red-500 text-center">Error</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="relative">
          {graphData}
          <h3 className="absolute mt-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-center">
            Total
          </h3>
        </div>
        <div className="flex flex-col mt-6 gap-4">
          <Labels fog={props} />
        </div>
      </div>
    </div>
  );
}

export default Graph;
export{};