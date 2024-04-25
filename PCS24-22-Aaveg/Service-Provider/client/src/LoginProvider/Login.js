import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { userContext } from "../App";
import axios from "axios";
import url from "../url";
import io from "socket.io-client";
import ENDPOINT from "../ENDPOINT";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../spinner/Spinner";

const Loginn = () => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const { dispatch } = useContext(userContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Enter all details", toastOptions);
      return;
    }
    try {
      setLoading(true);
      console.log(email, password);
      const { data } = await axios.post(`${url}/api/provider/signin`, {
        email,
        password,
      });
      console.log(data.status);
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
        return;
      } else {
        localStorage.setItem("id", data.id);
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.fname);
        localStorage.setItem("onLine", 2);
        dispatch({ type: "online", payload: 2 });
        dispatch({ type: "provider", payload: data });
        messageUpdate(data.token, data.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const guest = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await axios.post(
        `${url}/api/provider/signin`,
        {
          email: "guest@gmail.com",
          password: "guest",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.status === 400 || !data) {
        console.log("Fail to Sign Up");
      } else {
        localStorage.setItem("id", data.data.id);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("name", data.data.fname);
        localStorage.setItem("onLine", 2);
        dispatch({ type: "online", payload: 2 });
        dispatch({ type: "provider", payload: data.data });
        messageUpdate(data.data.token, data.data.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const messageUpdate = async (token, id) => {
    try {
      const data = await axios.post(
        `${url}/api/provider/details`,
        {
          id: id,
        },
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "messageupdate", payload: data.data.message });
      const conn = io(ENDPOINT);
      dispatch({ type: "socket", payload: conn });
      conn.emit("setup", id);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full ">
        <div className="loginForm rounded-2xl flex flex-col  justify-items-center items-center w-full p-5">
          <div className="loginForm__title text-5xl font-medium">
            Professionals Login<span className=" text-sky-400">.</span>
          </div>

          <div className="loginForm__subtitle pt-5 text-base">
            Don't have an account?
            <span className="ml-2 text-sky-400 font-medium">
              <Link to="/register">Register</Link>
            </span>
          </div>
          <div className="loginForm__subtitle pb-5 text-base">
            Don't have an account?
            <span className="ml-2 text-sky-400 font-medium">
              <input
                className="  py-3 w-24  ml-1"
                type="submit"
                onClick={guest}
                value="LogIn Guest"
              />
            </span>
          </div>

          <div className="loginForm__form">
            <form method="POST" className=" flex flex-col justify-center">
              <div className="mb-3 w-80">
                <label className="block">
                  <span className="text-grey-700 text-lg">Email Address</span>
                  <input
                    type="email"
                    className="mt-1 p-2 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="jondoe@email.com"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>

              <div className="mb-3 w-80">
                <label className="block">
                  <span className="text-grey-700 text-lg">Password</span>
                  <div className=" flex ">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="mt-1 p-2 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex justify-center my-4">
                <input
                  className="bg-sky-400 text-white py-3 w-24 rounded-full"
                  onClick={onSubmit}
                  type="submit"
                  disabled={loading}
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
      </div>
      <ToastContainer />
    </>
  );
};
export default Loginn;
