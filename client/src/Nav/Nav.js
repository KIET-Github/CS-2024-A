import { Link } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { useContext, useState } from "react";
import { userContext } from "../App";

export default function Nav() {
  const [navbar, setNavbar] = useState(false);

  const scrollToFooter = () => {
    scroll.scrollToBottom({
      duration: 500,
      smooth: true,
    });
  };

  const {
    state: { onLine },
  } = useContext(userContext);

  return (
    <nav className="w-full bg-white">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-2  ">
        {/* Rest of the code... */}
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/">
              <img
                width="100px"
                src="./Images/slogo.jpg"
                alt="logo"
                className="w-9"
              />
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 outline-none"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-gray-600 font-bold text-lg hover:text-blue-600">
                {
                  localStorage.getItem('onLine')==2?
                  <Link to="/dashboard">Home</Link>:
                  <Link to="/">Home</Link>
                }
              </li>
              {localStorage.getItem("onLine")?
              <>
              <li className="text-gray-600 font-bold text-lg hover:text-blue-600">
                <Link to="/message">Message</Link>
              </li>
              <li className="text-gray-600 font-bold text-lg hover:text-blue-600">
                <Link to="/edituser">Edit</Link>
              </li>
              </>
              :<></>}
              {localStorage.getItem("onLine") ? (
                <></>
              ) : (
                <li className="text-gray-600 text-lg font-bold hover:text-blue-600">
                  <ScrollLink
                    to="footer"
                    smooth={true}
                    duration={500}
                    offset={-100}
                    onClick={scrollToFooter}
                  >
                    <button> Professionals</button>
                  </ScrollLink>
                </li>
              )}
              {onLine ? (
                onLine == 1 ? (
                  <li className="text-gray-600 text-lg font-bold hover:text-blue-600">
                    <Link to="/logout">LogOut</Link>
                  </li>
                ) : (
                  <li className="text-gray-600 text-lg font-bold hover:text-blue-600">
                    <Link to="/out">LogOut</Link>
                  </li>
                )
              ) : (
                <li className="text-gray-600 font-bold text-lg hover:text-blue-600">
                  <Link to="/signin">SignIn</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
