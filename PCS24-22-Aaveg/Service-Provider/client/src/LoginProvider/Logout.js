import { useContext, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { userContext } from '../App';
import axios from 'axios';
import url from '../url'
import Spinner from '../spinner/Spinner';

const Login = () => {
    const navigate=useNavigate();
    const {dispatch,state:{socket}}=useContext(userContext);  

    const callLogOut=async()=>{
        try{
            const res=await axios.get(`${url}/api/provider/signout`,{
                headers:{
                    Authorization:localStorage.getItem('token'),
                    "Content-Type":"application/json"
                },
            })
            if(res.status===200){
                localStorage.removeItem("id");
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                localStorage.removeItem("onLine");
                dispatch({type:"offline"});
                if(Object.keys(socket).length!==0)socket.disconnect();
                navigate('/');
            }else{  
                console.log("Error");
                throw new Error("Logout Failed")
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
export default Login;