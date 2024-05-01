import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import url from '../url'
import io from 'socket.io-client'
import { userContext } from '../App';
import ENDPOINT from '../ENDPOINT';

const Sokcet = () => {

  const {state:{onLine,chat,socket,send},dispatch}=useContext(userContext);

  // Send

  const sendMessage=async()=>{
    if(localStorage.getItem("id") && send){
    if(send.content!==""){
      try {
        let sendUrl=`${url}/api/client/send`;
        if(localStorage.getItem('onLine')==2){
          sendUrl=`${url}/api/provider/send`;
        }
        const data=await axios.post(sendUrl,send,{
          method:"POST",
          headers:{
            Authorization:localStorage.getItem("token"),
            "Content-Type":"application/json"
          }
        })
        dispatch({type:"message",payload:{
          id:send.chatId,
          sender:send.sender,
          content:send.content
        }})
        dispatch({type:"chatmessage",payload:{
           id:send.chatId,
           sender:send.sender,
           content:send.content
        }})
        socket.emit('send',{
          id:send.id,
          chatId:send.chatId,
          sender:send.sender,
          content:send.content
        })
      } catch (error) {
        console.log(error);
      }
    }
    }
  }

  useEffect(()=>{
    sendMessage();
  },[send])
  

  // Recieve
  useEffect(()=>{
    if(localStorage.getItem("token") && socket){
    const handleReceive=(data)=>{
      dispatch({type:"message",payload:{
        id:data.chatId,
        sender:data.sender,
        content:data.content
      }})
      dispatch({type:"chatmessage",payload:{
        id:data.chatId,
        sender:data.sender,
        content:data.content
      }})
    }
    socket.on('recieved', handleReceive);

    return ()=>{
      socket.disconnect();
    }
    }
  },[socket])

  
  // Update
  const setProData=async()=>{
    try {
        const data=await axios.post(`${url}/api/provider/details`,{
            id:localStorage.getItem("id")
          },{
            method:"POST",
            headers:{
                Authorization:localStorage.getItem("token"),
                "Content-Type":"application/json"
            }
        })
      dispatch({type:"messageupdate",payload:data.data.message});
      dispatch({type:"provider",payload:data.data.user});

    } catch (error) {
        console.log(error);
    }
  }

  const setUserData=async()=>{
    try {
        const data=await axios.post(`${url}/api/client/details`,{
            id:localStorage.getItem("id")
          },{
            method:"POST",
            headers:{
                Authorization:localStorage.getItem("token"),
                "Content-Type":"application/json"
            }
        })
      dispatch({type:"location",payload:{
        city:localStorage.getItem('city'),
        postalCode:localStorage.getItem('postalCode'),
      }})
      dispatch({type:"messageupdate",payload:data.data.message});
      dispatch({type:"user",payload:data.data.user});
        
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=>{
    const tmp=localStorage.getItem("onLine");
    if(tmp && !onLine){
        dispatch({type:"online",payload:tmp});
        if(tmp==1){
          setUserData();
        }else{
          setProData();
        }
    }
    if(tmp){
        const conn=io(ENDPOINT);
        dispatch({type:"socket",payload:conn});
        conn.emit('setup',localStorage.getItem("id"));
    }
  },[])

  return (
    <>
    </>
  )
}

export default Sokcet
