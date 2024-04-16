import React from 'react'
import CustomerSatisfaction from './CustomerSatisfaction'
import ProjectCompleted from './ProjectCompleted'
import YearsMarket from './YearsMarket'
import HappyCustomer from './HappyCustomer'


export default function Fullreport() {
  return (
    <div>
      <div className=' text-black flex justify-center flex-wrap my-3'>
        <CustomerSatisfaction />
        <ProjectCompleted />
        <YearsMarket />
        <HappyCustomer />
      </div>
      <div className=' flex ml-8 justify-center  '>
        <img src='./Images/aa.png' alt='ourServices'  />
      </div>
    </div>
  )
}
