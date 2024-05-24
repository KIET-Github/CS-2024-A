import React from 'react'
import {default as api} from '../store/apiSlice';
import { getLabels } from '../helper/helper';

export default function Labels(fog:any) {
   console.log("fog",fog.fog.language);
   const{data,isFetching,isSuccess,isError}= api.useGetLabelsQuery({});
   let Transactions;

   if(isFetching)
   {
     Transactions=<div>fetching</div>
   }else if(isSuccess)
   {
    console.log("success");
    Transactions=getLabels(data,fog.fog.language).map((v,i)=><LabelComponent key={i} data={v}></LabelComponent>)
   }else if(isError)
   {
      Transactions=<div>Error</div>
   }
  return (
    <>
     {Transactions} 
    </>
  )
}

function LabelComponent(data:any){
    console.log(data,"data");
    if(!data)
    return <></>; 
    return (
        <div className='labels flex justify-between'>
            <div className='flex gap-2'>
            <div className='w-2 h-2 rounded py-3 mt-1' style={{background: data.data.color.color ?? '#f9c74f'}}></div>
                <h3 className='text-md'>{data.data.language ?? ''}</h3>
            </div>
            <h3 className='font-bold'>{data.data.percentage ?? 0}%</h3>
        </div> 
    )
} 