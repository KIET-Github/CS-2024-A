import React, { useEffect } from "react";
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useUserrProfile } from "../hooks/user";
import NavigationBar from '../components/NavigationBar'
import Footer from "./Footer";
const Protected = ({ children }) => {
  const {apiStatus}=useUserrProfile()
  const router = useRouter()
  const { isLoggedin } = useSelector((state) => state.auth);
  useEffect(() => {
    if(apiStatus=='ERROR')
    if (!isLoggedin) router.push('/login')
  }, [apiStatus]);
  return <>
  <NavigationBar/>
    {children}
    <Footer/>
  </>;
};

export default Protected;
