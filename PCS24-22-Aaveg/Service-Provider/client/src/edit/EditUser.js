import React, { useContext, useEffect } from "react";

import axios from "axios";
import { userContext } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editProvider, editUser } from "../routes/APIroute";
function EditUser() {
  const toastoptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const toastoptionserror = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const {
    state: { user, onLine },
    dispatch,
  } = useContext(userContext);

  console.log(user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.put(editUser, {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        mobile: user.mobile,
        userId: user._id,
      });
      if (data.status === true) {
        toast.success(data.msg, toastoptions);
      } else if (data.status === false) {
        toast.error(data.msg, toastoptionserror);
      }
    } catch (e) {
      toast.error("Unable to update data", toastoptionserror);
      return;
    }
  };
  const handleSubmitprovider = async (event) => {
    event.preventDefault();
    try {
      console.log(user);
      const { data } = await axios.put(editProvider, {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        mobile: user.mobile,
        userId: user._id,
      });
      console.log(data);
      if (data.status === true) {
        toast.success(data.msg, toastoptions);
      } else if (data.status === false) {
        toast.error(data.msg, toastoptionserror);
      }
    } catch (e) {
      toast.error("Unable to update data", toastoptionserror);
      return;
    }
  };

  return (
    <>
      {onLine == 1 ? (
        <div>
          <div className="flex  items-center justify-center  bg-slate-300 border-1 border-gray-600 shadow-2xl">
            <h2 className="py-12 uppercase font-serif ">
              Account details User
            </h2>
          </div>
          <div>
            <form className="pt-6 pl-10" onSubmit={handleSubmit}>
              <div className="grid justify-center">
                <div className="pt-3 grid  justify-items-center align-middle">
                  <label className="pl-1" htmlFor="inputUsername">
                    User First name
                  </label>
                  <input
                    className="border-solid rounded-md border-slate-700 pl-2 border-2"
                    id="inputUsername"
                    type="text"
                    value={user ? user.fname : "fname"}
                    onChange={(e) =>
                      dispatch({
                        type: "userchange",
                        payload: { type: "fname", value: e.target.value },
                      })
                    }
                    placeholder="Enter your First Name"
                  />
                </div>
                <div className="pt-3 grid  justify-items-center align-middle ">
                  <label className="pl-1" htmlFor="inputUsername">
                    User Last name
                  </label>
                  <input
                    className="border-solid border-2 pl-1 rounded-md border-slate-700 "
                    id="inputUsername"
                    type="text"
                    value={user ? user.lname : "lname"}
                    onChange={(e) =>
                      dispatch({
                        type: "userchange",
                        payload: { type: "lname", value: e.target.value },
                      })
                    }
                    placeholder="Enter your Last Name"
                  />
                </div>
                <div className="pt-3 grid  justify-items-center align-middle">
                  <label className="pl-1" htmlFor="inputUsername">
                    Enter new Mobile number
                  </label>
                  <input
                    className="border-solid border-2 pl-1 rounded-md border-slate-700 "
                    id="inputUsername"
                    type="text"
                    value={user ? user.mobile : "Phone"}
                    onChange={(e) =>
                      dispatch({
                        type: "userchange",
                        payload: { type: "mobile", value: e.target.value },
                      })
                    }
                    placeholder="Enter your Mobile Number"
                  />
                </div>
                <div className="pt-3 grid  justify-items-center align-middle ">
                  <label className="pl-1" htmlFor="inputUsername">
                    Enter your New Mail
                  </label>
                  <input
                    className="border-solid border-2 pl-1 rounded-md border-slate-700 "
                    id="inputUsername"
                    type="text"
                    value={user ? user.email : "Email"}
                    onChange={(e) =>
                      dispatch({
                        type: "userchange",
                        payload: { type: "email", value: e.target.value },
                      })
                    }
                    placeholder="Enter new Mail"
                  />
                </div>
                <div className="pt-6 pl-16 pb-5">
                  <button className="pt-1 pr-1 pb-1 bg-slate-300 border-solid border-2 pl-1 rounded-md border-slate-700 ">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : onLine == 2 ? (
        <div>
          <div className="flex  items-center justify-center  bg-slate-300 border-1 border-gray-600 shadow-2xl">
            <h2 className="py-12 uppercase font-serif ">
              Account details Provider
            </h2>
          </div>
          <div>
            <form className="pt-6 pl-10" onSubmit={handleSubmitprovider}>
              <div className="grid justify-center">
                <div className="pt-3 grid  justify-items-center align-middle">
                  <label className="pl-1" htmlFor="inputUsername">
                    User First name
                  </label>
                  <input
                    className="border-solid rounded-md border-slate-700 pl-2 border-2"
                    id="inputUsername"
                    type="text"
                    value={user ? user.fname : "fname"}
                    onChange={(e) =>
                      dispatch({
                        type: "userchange",
                        payload: { type: "fname", value: e.target.value },
                      })
                    }
                    placeholder="Enter your First Name"
                  />
                </div>
                <div className="pt-3 grid  justify-items-center align-middle ">
                  <label className="pl-1" htmlFor="inputUsername">
                    User Last name
                  </label>
                  <input
                    className="border-solid border-2 pl-1 rounded-md border-slate-700 "
                    id="inputUsername"
                    type="text"
                    value={user ? user.lname : "lname"}
                    onChange={(e) =>
                      dispatch({
                        type: "userchange",
                        payload: { type: "lname", value: e.target.value },
                      })
                    }
                    placeholder="Enter your Last Name"
                  />
                </div>
                <div className="pt-3 grid  justify-items-center align-middle">
                  <label className="pl-1" htmlFor="inputUsername">
                    Enter new Mobile number
                  </label>
                  <input
                    className="border-solid border-2 pl-1 rounded-md border-slate-700 "
                    id="inputUsername"
                    type="text"
                    value={user ? user.mobile : "Phone"}
                    onChange={(e) =>
                      dispatch({
                        type: "userchange",
                        payload: { type: "mobile", value: e.target.value },
                      })
                    }
                    placeholder="Enter your Mobile Number"
                  />
                </div>
                <div className="pt-3 grid  justify-items-center align-middle ">
                  <label className="pl-1" htmlFor="inputUsername">
                    Enter your New Mail
                  </label>
                  <input
                    className="border-solid border-2 pl-1 rounded-md border-slate-700 "
                    id="inputUsername"
                    type="text"
                    value={user ? user.email : "Email"}
                    onChange={(e) =>
                      dispatch({
                        type: "userchange",
                        payload: { type: "email", value: e.target.value },
                      })
                    }
                    placeholder="Enter new Mail"
                  />
                </div>
                <div className="pt-6 pl-16 pb-5">
                  <button className="pt-1 pr-1 pb-1 bg-slate-300 border-solid border-2 pl-1 rounded-md border-slate-700 ">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="">Please check if you are login</h1>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default EditUser;
