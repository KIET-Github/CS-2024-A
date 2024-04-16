import React, { useEffect, useState } from 'react';
import { userContext } from '../App';
import { useContext } from 'react';
import url from '../url';
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Chat = () => {

  const navigate=useNavigate();

  const {state:{provider,message,user},dispatch}=useContext(userContext);

  const [image, setImage] = useState(null);
  const [rated, setRated] = useState(4);
 

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDefaultImageClick = () => {
    // Trigger click event on the hidden file input
    document.getElementById('imageInput').click();
  };

  const create=async()=>{
    try {
      const {data}=await axios.post(`${url}/api/client/create`,{
        user:user._id,
        provider:provider._id
      },{
        method:"POST",
        headers:{
          Authorization:localStorage.getItem('token'),
          "Content-Type":"application/json"
        }
    });
    dispatch({type:"create",payload:data._id});
    dispatch({type:'chat',payload:{
      chatId:data._id,
      message:[],
      puser:0,
      latest:"Say Hi!"
    }});

    } catch (error) {
      console.log(error);
    }
  }

  const goChatting=()=>{

    let present;
    if(message.length){
      present=message.some((obj)=>{
        if(!obj.provider){
          return false;
        }
        if(obj.provider._id===provider._id){
          dispatch({type:'chat',payload:obj})
          return true;
        }
        return false;
      });
    }
    if(!present){
      create();
    }
    navigate('/chatting')
  }
  
  return (
    <>
      <div>
      <div className>
      <div className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover">
        <div className="flex justify-center items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
          <div
            id="profile"
            className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
          >
            <div className="p-4 md:p-12 text-center lg:text-left">
              <div>
                <input
                  type="file"
                  id="imageInput"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                {!image && (
                  <img
                    src="./icons/Default.png" 
                    alt="Default Image"
                    className="block rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 object-cover object-center cursor-pointer"
                    onClick={handleDefaultImageClick}
                  />
                )}
                {image && (
                  <img
                    src={image}
                    alt="Selected Image"
                    className="block rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 object-cover object-center"
                  />
                )}
              </div>
              <h1 className="text-3xl text-center font-bold pt-8 lg:pt-0">{provider.fname}  {provider.lname}</h1>
              <p className="pt-4 text-base text-center  font-bold flex items-center justify-center "><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" /></svg>{provider.profession}</p>
              <p className="pt-2 text-gray-600 text-center text-xs lg:text-sm flex items-center justify-center "><svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" /></svg> Your Location : City - {provider.city} <br /> State - {provider.state} , Pincode - {provider.pincode} </p>
              <div className=' pt-8'>
                <p className=" text-sm text-center "><span className=' font-bold text-base '>Email</span> - {provider.email}  </p>
                <p className=" text-sm text-center  "><span className=' font-bold text-base '>Phone Number</span> - {provider.mobile}  </p>
                <p className=" text-sm text-center  "><span className=' font-bold text-base '>Experience</span> - // take experience data  </p>
              </div>

              <div className="flex justify-center mt-3 gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`h-5 w-5 ${index < rated ? "text-yellow-500" : "text-gray-400"
                        }`}
                      onClick={() => setRated(index + 1)}
                    />
                  ))}
                </div>
                <p className="text-blue-gray-500 font-medium">
                  {rated}.0 Rated
                </p>
              </div>

              <div className="pt-12 pb-8 flex justify-center">
                <button onClick={goChatting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-32 rounded-full">
                  Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

    </>
  )
};

export default Chat;
