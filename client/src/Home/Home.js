import React, { useEffect } from 'react';
import Card from '../Card/Card'
import Banner from '../Banner/Banner';
import Fullreport from '../creport/Fullreport';
import { useNavigate } from 'react-router-dom';


const Home=()=>{
    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('onLine')==2){
            navigate('/dashboard');
        }
    },[]);

    return (
        <>
        <div>
            <Banner/>
            <Fullreport/>
            <Card type="Home Repairs"/>
            <Card type="Cleaning"/>
            <Card type="Designing"/>
            <Card type="Beauty"/>
        </div>
        </>
    )
}

export default Home;