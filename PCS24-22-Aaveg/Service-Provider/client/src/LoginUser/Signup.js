import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import url from "../url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUpRouteUser } from "../routes/APIroute";

const SignIn = () => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();

  const [userData, setuserData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeHandle = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setuserData({ ...userData, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const { fname, lname, email, mobile, password, cpassword } = userData;
    if (fname === ""  || mobile === "") {
      setLoading(false);
      toast.error("Enter all details", toastOptions);
      return;
    }
    if (email === "") {
      setLoading(false);
      toast.error("Enter email", toastOptions);
      return;
    }
    if (password.length < 4) {
      setLoading(false);
      toast.error("Atleast 4 digit Password", toastOptions);
      return;
    }
    if (password === "" || cpassword === "") {
      setLoading(false);
      toast.error("Enter password and confirm password", toastOptions);
      return;
    }
    if (mobile.length !== 10) {
      setLoading(false);
      toast.error("Enter valid 10 digit number", toastOptions);
      return;
    }
    if (password !== cpassword) {
      setLoading(false);
      toast.error("Password and confirm password do not match", toastOptions);
      return;
    }
    try {
      const { data } = await axios.post(
        signUpRouteUser,
        {
          fname,
          lname,
          email,
          mobile,
          password,
          
        }
        );
        if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else if (data.status === true) {
        setLoading(false);
        navigate("/signin");
      } 
    } catch (error) {
      console.log(error);
      toast.error("Error while connecting to server", toastOptions);
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-4/5 grid grid-cols-1 md:grid-cols-2 justify-items-center items-center">
        <div className="signupForm rounded-2xl w-11/12 md:w-8/12 p-5">
          <div className="signupForm__title text-5xl font-medium">
            Sign Up<span className="text-sky-400">.</span>
          </div>

          <div className="loginForm__subtitle py-5 text-base">
            Already have an account?
            <span className="ml-2 text-sky-400 font-medium">
              <Link to="/signin">Sign In</Link>
            </span>
          </div>

          <div className="loginForm__form">
            <form method="POST">
              <div className="mb-3">
                <label className="block">
                  <span className="text-grey-700">First Name</span>
                  <input
                    type="text"
                    className="mt-1 p-2 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="Enter First Name"
                    name="fname"
                    value={userData.fname}
                    onChange={onChangeHandle}
                    required
                  />
                </label>
              </div>

              <div className="mb-3">
                <label className="block">
                  <span className="text-grey-700">Last Name</span>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="Enter Last Name"
                    name="lname"
                    value={userData.lname}
                    onChange={onChangeHandle}
                    required
                  />
                </label>
              </div>

              <div className="mb-3">
                <label className="block">
                  <span className="text-grey-700">Email Address</span>
                  <input
                    type="email"
                    className="mt-1 p-2 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="jondoe@email.com"
                    name="email"
                    value={userData.email}
                    onChange={onChangeHandle}
                    required
                  />
                </label>
              </div>

              <div className="mb-3">
                <label className="block">
                  <span className="text-grey-700">Phone Number</span>
                  <input
                    type="text"
                    minLength="10"
                    maxLength="10"
                    className="mt-1 p-2 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    placeholder="Enter Phone Number"
                    name="mobile"
                    value={userData.mobile}
                    onChange={onChangeHandle}
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
                      placeholder="Password"
                      name="password"
                      value={userData.password}
                      onChange={onChangeHandle}
                      required
                    />
                    {userData.password && (
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="eye-icon -ml-6 mt-4"
                        onClick={toggleShowPassword}
                      />
                    )}
                  </div>
                </label>
              </div>

              <div className="mb-3">
                <label className="block">
                  <span className="text-grey-700">Confirm Password</span>
                  <div className=" flex ">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="mt-1 p-2 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                      placeholder="Confirm Password"
                      name="cpassword"
                      value={userData.cpassword}
                      onChange={onChangeHandle}
                      required
                    />
                    {userData.password && (
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="eye-icon -ml-6 mt-4"
                        onClick={toggleShowPassword}
                      />
                    )}
                  </div>
                </label>
              </div>

              <div className="mt-6">
                <input
                  className="py-3 w-24 bg-sky-400 text-white rounded-full"
                  type="submit"
                  onClick={onSubmit}
                  value="SignUp"
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
        <div></div>
        <div className="hidden md:block bg-[url('https://img.freepik.com/free-vector/cleaner-with-cleaning-products-housekeeping-service_18591-52057.jpg?w=740&t=st=1682167423~exp=1682168023~hmac=f0aae2ea84ab46eea6a12d64dadd8e9a92ac895b93fdb4d55d2fab433abef97b')] bg-right bg-no-repeat w-full h-full"></div>
      </div>
      <ToastContainer />
    </>
  );
};
export default SignIn;
