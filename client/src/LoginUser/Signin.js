import { useState,useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { userContext } from '../App';
import axios from 'axios'
import url from '../url'
import io from 'socket.io-client'
import ENDPOINT from '../ENDPOINT';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRouteUser } from '../routes/APIroute';
import ReverseGeocode from "../reverseGeoCode/ReverseGeoCode";


const Login = () => {

  const { state:{location}, dispatch } = useContext(userContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading , setLoading] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Enter email", toastOptions);
      return;
    }
    if (password === "") {
      toast.error("Enter password", toastOptions);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(loginRouteUser, {
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
        setLoading(false);
      } else if (data.status === true) {
        localStorage.setItem("city", location.city);
        localStorage.setItem("postalCode", location.postalCode);
        localStorage.setItem("id", data.id);
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("onLine", 1);
        dispatch({ type: "online", payload: 1 });
        messageUpdate(data.id);
        navigate("/");
      }
    } catch (e) {
      toast.error(e.message, toastOptions);
    } finally{
      setLoading(false);
    }
  };

  const guest = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(loginRouteUser, {
        email: "guest@gmail.com",
        password: "guest",
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else if (data.status === true) {
        console.log(location.city);
        localStorage.setItem("city", location.city);
        localStorage.setItem("postalCode", location.postalCode);
        localStorage.setItem("id", data.id);
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("onLine", 1);
        dispatch({ type: "online", payload: 1 });
        messageUpdate(data.id);
        navigate("/");
      }
    } catch (e) {
      toast.error("Can't connect to server", toastOptions);
    } finally{
      setLoading(false);
    }
  };

  const messageUpdate = async (id) => {
    try {
      const data = await axios.post(
        `${url}/api/client/details`,
        {
          id: id,
        },
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "user", payload: data.data.user });
      dispatch({ type: "messageupdate", payload: data.data.message });
      const conn = io(ENDPOINT);
      dispatch({ type: "socket", payload: conn });
      conn.emit("setup", id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-4/5 grid grid-cols-1 md:grid-cols-2 justify-items-center items-center">
        <div className="loginForm rounded-2xl w-11/12 md:w-8/12 h-4/5 md:h-5/6 p-5">
          <div className="loginForm__title text-5xl font-medium">
            SignIn<span className=" text-sky-400">.</span>
          </div>

          <div className="loginForm__subtitle pt-5 text-base">
            Don't have a permanent account?
            <span className="ml-2 text-sky-400 font-medium">
              <Link to="/signup">Sign Up</Link>
            </span>
          </div>

          <div className="loginForm__subtitle pb-5 text-base">
            Don't have an account?
            <span className="ml-2 text-sky-400 font-medium">
            <input className="  py-3 w-24  ml-1" type="submit" onClick={guest} value="LogIn Guest"/>
            </span>
          </div>
          
          

          <div className="loginForm__form">
            <form method="POST">
              <div className="mb-3">
                <label className="block">
                  <span className="text-grey-700">Email Address</span>
                  <input
                    type="email"
                    className="mt-1 p-2 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="jondoe@email.com"
                    value={email}
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </label>
              </div>

              <div className="mb-3">
                <label className="block">
                  <span className="text-grey-700">Password</span>
                  <div className=" flex ">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="mt-1 p-2 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                      value={password}
                      name="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="Password"
                      required
                    />
                    {password && (
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="eye-icon -ml-6 mt-4"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    )}
                  </div>
                </label>
              </div>

              <div className="my-10 flex justify-center">
               
                  <input
                  className=" bg-sky-400 text-white py-3 w-24 rounded-full"
                  type="submit"
                  onClick={onSubmit}
                  value="SignIn"
                />
                {loading && (
                   <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-transparent backdrop-blur-sm">
                      <div className="flex justify-center w-12 h-12 border-4 border-dashed rounded-full animate-spin dark:border-sky-400"></div>
                    </div>
                  )}      
              </div>
            </form>
          </div>
        </div>

        <div className="hidden md:block bg-[url('https://img.freepik.com/free-vector/cleaners-with-cleaning-products-housekeeping-service_18591-52068.jpg?w=740&t=st=1682166693~exp=1682167293~hmac=64f5e0eb7e8469795f4782203b4f34d321d34786324396addf4fd0b94cee2f24')]  bg-right bg-no-repeat w-full h-[500px]"></div>
      </div>
      <ReverseGeocode />
      <ToastContainer />
    </>
  );
};
export default Login;
