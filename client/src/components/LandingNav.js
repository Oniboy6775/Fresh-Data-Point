import React from "react";
import { TiThMenu } from "react-icons/ti";
import { useGlobalContext } from "../context/UserContext";
import WelcomeBanner from "./WelcomeBanner";
import {
  Avatar,
  Button,
  DarkThemeToggle,
  Dropdown,
  Navbar,
} from "flowbite-react";
import { NavLink, useNavigate } from "react-router-dom";
const LandingNav = () => {
  const { toggleNav } = useGlobalContext();
  const nav = [
    { name: "home", path: "/" },
    { name: "Login", path: "/login" },
    { name: "register an account", path: "/register" },
    // { name: "our services", path: "/services" },
    { name: "price list", path: "/priceList" },
  ];
  const navigate = useNavigate();
  return (
    <Navbar
      className="fixed left-0 right-0 top-0 z-20 bg-[var(--primary-400)]"
      fluid
      rounded
    >
      <Navbar.Brand href="/">
        <img src="/assets/logo.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl text-white font-semibold dark:text-white capitalize">
          freshDataPoint
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button onClick={() => navigate("/register")} className="btn mr-2">
          Get started
        </Button>
        <DarkThemeToggle />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {nav.map((e, index) => {
          return (
            <>
              <Navbar.Link className="capitalize p-4  ">
                <NavLink
                  to={e.path}
                  key={index}
                  // onClick={toggleNav}
                  className={({
                    isActive,
                  }) => ` text-white p-4 capitalize hover:border-b-2 hover:shadow-md hover:bg-[var(--primary-700)] hover:text-white border-none rounded-md
                  ${isActive ? " active" : "nav__btn"}`}
                >
                  {e.name}
                </NavLink>
              </Navbar.Link>
            </>
          );
        })}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default LandingNav;
