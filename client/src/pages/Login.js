import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput";
import { useGlobalContext } from "../context/UserContext";
import LandingNav from "../components/LandingNav";
import { BsEyeSlash } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { Avatar, Button, Card, Label } from "flowbite-react";

function Login() {
  const { setupUser, handleChange, userName, password, isLoading } =
    useGlobalContext();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !userName) return toast.warning("All field are required");
    let currentUser = { password, userName };
    setupUser({ currentUser, endPoint: "login" });
  };
  return (
    <div className=" h-screen  flex  items-center gap-4 max-w-[var(--maxWidth)] md:pl-4 bg-[var(--primary-100)]">
      <Card className="border w-11/12 m-auto max-w-[400px] border-[var(--primary-300)]">
        <LandingNav />
        <div className="flex justify-between">
          <Avatar img={logo} rounded bordered />
          <Button onClick={() => navigate("/")} className="btn ">
            <FaHome />
          </Button>
        </div>

        <h1 className="title">LOGIN</h1>
        <form className="flex max-w-md flex-col  gap-4" onSubmit={handleSubmit}>
          <FormInput
            name="userName"
            value={userName}
            placeholder="username/email/business name"
            type="userName"
            handleChange={handleInputChange}
            labelText="username/email/business name"
            icon={HiMail}
          />
          <FormInput
            name="password"
            value={password}
            placeholder="password"
            type="password"
            handleChange={handleInputChange}
            labelText="password"
            icon={BsEyeSlash}
          />
          <Button
            isProcessing={isLoading}
            disabled={isLoading}
            type="submit"
            className="btn text-center"
          >
            <FaUserAlt className="mr-2 h-5 w-5" />
            {isLoading ? " please wait.." : " Login"}
          </Button>

          <div className="flex items-center gap-2">
            {/* <Checkbox id="agree" /> */}
            <Label htmlFor="agree" className="flex">
              Am new here&nbsp;
              <Link
                className="text-cyan-600 hover:underline dark:text-cyan-500"
                to="/register"
              >
                Register an account
              </Link>
            </Label>
          </div>
          <Button
            isProcessing={isLoading}
            disabled={isLoading}
            size="sm"
            className="btn btn-danger btn-hipster "
            onClick={() => navigate("/requestPasswordReset")}
            type="submit"
          >
            i forgot my password
          </Button>
        </form>
      </Card>
      <Card className=" dark_mode hidden w-full  md:grid items-center bg-[var(--primary-700)] text-white self-stretch">
        <h2 className="title">We are always here to serve you better......</h2>
      </Card>
    </div>
  );
}

export default Login;

export const Container = styled.div`
  padding: 3rem 0;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  background-color: var(--primary-200);
`;
export const Wrapper = styled.div`
  text-align: center;
  margin: auto;
  max-width: 400px;
  max-height: fit-content;
  padding: 1rem;
  width: 80%;
  background-color: var(--grey-200);
  border-radius: var(--borderRadius);
  position: relative;
  .logo {
    position: absolute;
    left: 1rem;
    border-radius: 100px;
  }
  .home__btn {
    position: absolute;
    right: 1rem;
  }
  .title {
    font-weight: 900;
    text-align: center;
    margin: 2rem auto 1rem;
  }
  .new__user {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-weight: 700;
      font-size: 1.5rem;
      color: var(--primary-800);
    }
  }
  .register__btn {
    background-color: var(--red-dark);
    padding: 0.5rem;
  }
`;
