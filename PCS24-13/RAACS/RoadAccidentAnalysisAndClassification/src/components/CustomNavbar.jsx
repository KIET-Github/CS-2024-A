import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  MobileNav,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import "../styles/CustomNavbar.css";

export default function CustomNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-[white]">
      <Typography as="li" variant="h2" className="p-1 font-normal text-lg">
        <Link to="/map" className="flex items-center">
          Analyze
        </Link>
      </Typography>
      <Typography as="li" variant="h2" className="p-1 font-normal text-lg">
        <Link to="/live" className="flex items-center">
          Live Severity
        </Link>
      </Typography>
      <Typography as="li" variant="h2" className="p-1 font-normal text-lg">
        <Link to="/live-simulation" className="flex items-center">
          Live Simulation
        </Link>
      </Typography>

      <Typography as="li" variant="h2" className="p-1 font-normal text-lg">
        <Link
          to="https://1drv.ms/b/s!AuUEa7It0N2cpzgEUna2NDHNYJcI?e=feO1zP"
          className="flex items-center"
        >
          Docs
        </Link>
      </Typography>
    </ul>
  );

  return (
    <>
      <Navbar
        className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4"
        color="transparent"
      >
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to="/welcome">
            <Typography
              variant="h2"
              className="mr-4 cursor-pointer py-1.5 font-medium nav--heading mx-6 text-[white]"
            >
              RoadWise
            </Typography>
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
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
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>{navList}</MobileNav>
      </Navbar>
    </>
  );
}
