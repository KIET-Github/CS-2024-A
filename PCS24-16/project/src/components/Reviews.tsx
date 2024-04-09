import './Reviews.css';
import React from 'react'
import {default as api}from '../store/apiSlice';


export default function Review() {
  const{data,isFetching,isSuccess,isError}= api.useGetLabelsQuery({})

  let Transactions;


   if(isFetching){
    Transactions=<div>Fetching</div>
   }else if(isSuccess){
    Transactions=data.map((v:any,i:any)=><Transaction key={i} category={v}></Transaction>).reverse();
   }else if(isError){
    Transactions=<div>Error</div>
   }

  return (
    <>
    <h1 className='py-6 font-bold text-6xl text-slate-900'>Valuable Reviews</h1>
    <div className='grid grid-cols-2 gap-4 justify-between'>
    {Transactions}
    </div>
    </>
  )
}

function Transaction( category:any ) {
  if (!category) return null;
//  console.log(category);
  return (
    
    <article className="shadow-2xl review px-4 py-6 md:px-8 md:py-10 rounded-lg ">
      <h4 className="author text-4lg md:text-xl font-medium mb-2">
        Name - {category.category.name}
      </h4>

      <p className="job text-4lg md:text-lg leading-relaxed mb-4">
        Feedback:{' '}
        <span
          className={"text-gray-600 rounded-md p-1 md:p-2"}
        >
          {category.category.feed}
        </span>
      </p>

      <p className="md:text-lg ">
        <span className="italic text-4lg text-gray-600">Current Language:</span>{' '}
        <span className="font-medium text-gray-950">{category.category.language}</span>
      </p>

      <p className=" md:text-lg ">
        <span className="italic text-4lg text-gray-600">Future Language:</span>{' '}
        <span className="font-medium text-gray-600">{category.category.future}</span>
      </p>
    </article>
  );
}
