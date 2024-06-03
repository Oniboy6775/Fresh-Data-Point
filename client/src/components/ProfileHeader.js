import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useGlobalContext } from "../context/UserContext";
import {
  Avatar,
  Button,
  DarkThemeToggle,
  Dropdown,
  Navbar,
} from "flowbite-react";
import {
  sideBarButton,
  adminSideBarButton,
  agentSideBarButton,
} from "../utils/data";
function ProfileHeader() {
  const { toggleSideBar, isAdmin, isAgent, logoutUser, user } =
    useGlobalContext();
  const navigate = useNavigate();
  const logout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <Navbar
      fluid
      rounded
      className="bg-[var(--primary-500)] text-white z-30 top-0 fixed right-0 left-0"
    >
      <Navbar.Brand>
        <Navbar.Toggle
          onClick={() => toggleSideBar()}
          className="text-white hover:text-black"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          ₦{user.balance || 0}
        </span>
      </Navbar.Brand>
      {isAdmin ? (
        <Button className=" btn" onClick={() => navigate("/profile")}>
          ADMIN
        </Button>
      ) : (
        <button className="btn" onClick={() => navigate("/profile")}>
          {isAgent ? "Agent" : <FaHome className="text-2xl" />}{" "}
        </button>
      )}
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={true}
          inline
          label={
            <Avatar
              size="md"
              alt="User settings"
              img="./assets/avatar.svg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm font-bold">
              {user.userName || ""} [{user.userType}]
            </span>
            <span className="block truncate text-sm font-medium">
              {user.email || ""}
            </span>
          </Dropdown.Header>
          {sideBarButton.map((e) => {
            return (
              <Dropdown.Item
                onClick={() => navigate(e.url)}
                className="capitalize hover:border-l-2 hover:border-red-500"
                key={e.name}
              >
                {e.name}
              </Dropdown.Item>
            );
          })}
          <Dropdown.Divider />
          {/* {isAgent && (
            <Dropdown.Divider>
              {agentSideBarButton.map((e) => (
                <Dropdown.Item
                  onClick={() => navigate(e.url)}
                  className="capitalize hover:border-r-2 hover:border-red-500"
                  key={e.name}
                >
                  {e.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Divider>
          )}
          {isAdmin && (
            <Dropdown.Divider>
              {adminSideBarButton.map((e) => (
                <Dropdown.Item
                  onClick={() => navigate(e.url)}
                  className="capitalize hover:border-r-2 hover:border-red-500"
                  key={e.name}
                >
                  {e.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Divider>
          )} */}
          <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
        </Dropdown>
        <DarkThemeToggle />
      </div>
    </Navbar>
  );
}

export default ProfileHeader;
