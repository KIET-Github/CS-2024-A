import React, { createContext, useEffect, useReducer } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Service from "./Services/Services";
import LoginUser from "./LoginUser/Signin";
import LoginPro from "./LoginProvider/Login";
import SignInUser from "./LoginUser/Signup";
import SignInPro from "./LoginProvider/Register";
import LogoutUser from "./LoginUser/Logout";
import LogoutPro from "./LoginProvider/Logout";
import Chat from "./Chat/Chat";
import Chatting from "./Chat/Chatting";
import Home from "./Home/Home";
import Footer from "./Footer/Footer";
import Dashboard from "./DashBoardProvider/Dashboard";
import Chats from "./DashBoardProvider/Chats";
import Message from "./Message/Message";
import Socket from "./Socket/Socket";
import Nav from "./Nav/Nav";
import ErrorPage from "./errorPage/ErrorPage";
import "./Css/index.css";
import "./Css/card.css";
import "./Css/search.css";
import EditUser from "./edit/EditUser";
export const userContext = createContext();

// const [initialState,setInitialState]=useState({
const initialState = {
  onLine: 0,
  user: null,
  provider: null,
  message: [],
  chat: null,
  socket: null,
  send: null,
  location:{
    city: 'default',
    postalCode: 0
  }
};
// });

const ActionType = {
  ONLINE: "online",
  OFFLINE: "offline",
  USER: "user",
  PROVIDER: "provider",
  CREATE: "create",
  MESSAGEUPDATE: "messageupdate",
  MESSAGE: "message",
  CHAT: "chat",
  CHATMESSAGE: "chatmessage",
  SOCKET: "socket",
  SEND: "send",
  USERCHANGE: "userchange",
  LOCATION: "location",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.ONLINE:
      return { ...state, onLine: action.payload };
    case ActionType.OFFLINE:
      return {
        onLine: 0,
        user: null,
        provider: null,
        message: [],
        chat: null,
        socket: null,
        send: null,
      };
    case ActionType.USER:
      return { ...state, user: action.payload };
    case ActionType.PROVIDER:
      return { ...state, provider: action.payload };
    case ActionType.CREATE:
      return {
        ...state,
        message: [
          ...state.message,
          {
            chatId: action.payload,
            message: [],
            puser: 0,
            latest: "Say Hi!",
          },
        ],
      };
    case ActionType.MESSAGEUPDATE:
      return { ...state, message: action.payload };
    case ActionType.MESSAGE:
      return {
        ...state,
        message: state.message.map((item) => {
          if (item._id === action.payload.id) {
            item.message = [
              ...item.message,
              {
                sender: action.payload.sender,
                content: action.payload.content,
              },
            ];
          }
          return item;
        }),
      };
    case ActionType.CHAT:
      return { ...state, chat: action.payload };
    case ActionType.CHATMESSAGE:
      if (state.chat) {
        if (state.chat._id === action.payload.id) {
          return {
            ...state,
            chat: {
              ...state.chat,
              message: [...state.chat.message, action.payload],
            },
          };
        }
      }
      return state;
    case ActionType.SOCKET:
      return { ...state, socket: action.payload };
    case ActionType.SEND:
      return { ...state, send: action.payload };
    case ActionType.USERCHANGE:
      return {
        ...state,
        user: { ...state.user, [action.payload.type]: action.payload.value },
      };
    case ActionType.LOCATION:
      return {...state,location:action.payload};
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(()=>{
    const pre=document.getElementsByTagName('pre');
    if(pre.length>0){
      navigate('/');
    }
  },[])

  return (
    <>
      <userContext.Provider value={{ state, dispatch }}>
        <Nav />
        <Socket />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/Service" Component={Service} />
          <Route path="/chat" Component={Chat} />
          <Route path="/chatting" Component={Chatting} />

          <Route path="/signin" Component={LoginUser} />
          <Route path="/signup" Component={SignInUser} />
          <Route path="/logout" Component={LogoutUser} />
          <Route path="/login" Component={LoginPro} />
          <Route path="/register" Component={SignInPro} />
          <Route path="/out" Component={LogoutPro} />

          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/dashboard/chatting" Component={Chats} />

          <Route path="/message" Component={Message} />
          <Route path="*" Component={ErrorPage} />
          <Route path="/edituser" Component={EditUser} />
        </Routes>
        <Footer id="footer" />
      </userContext.Provider>
    </>
  );
};

export default App;
