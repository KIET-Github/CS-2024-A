import { useEffect,useContext } from 'react';
import {useNavigate } from 'react-router-dom';
import { userContext } from '../App';
import axios from 'axios';
import url from '../url'
import Spinner from '../spinner/Spinner';

const Logout = () => {
    const {dispatch,state:{socket}}=useContext(userContext);  
    const navigate=useNavigate();

    const callLogOut=async()=>{
        try{
            const res=await axios.get(`${url}/api/client/signout`,{
                headers:{
                    Authorization:localStorage.getItem('token'),
                    Accept:"application/json",
                },
            })
            if(res.status===400){
                console.log("Error");
                throw new Error("Logout Failed")
            }else{  
                if(Object.keys(socket).length!==0){
                    socket.disconnect();
                }
                localStorage.removeItem("id");
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                localStorage.removeItem("onLine");
                localStorage.removeItem("city");
                localStorage.removeItem("city");
                localStorage.removeItem("postalCode");
                dispatch({type:"offline"});
                dispatch({type:"location",payload:{city:'default',postalCode:0}});
                navigate('/');
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        callLogOut();
    },[])


  return (
    <>
    <Spinner/>
    </>
  )
}
export default Logout;