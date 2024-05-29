import React from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../images/logo.png";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { Container, Wrapper } from "./Login";
import { useGlobalContext } from "../context/UserContext";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";
import { Avatar, Button, Card, Label } from "flowbite-react";
import { BsEyeSlash, BsPerson } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import LandingNav from "../components/LandingNav";
import { BiPhoneCall } from "react-icons/bi";
function RequestResetPassword() {
  const { handleChange, email, isLoading, requestPasswordReset } =
    useGlobalContext();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.warning("Enter an your email");
      return;
    }
    requestPasswordReset();
  };
  return (
    // <Container>
    //   <Wrapper>
    //     <div className="rounded-full  w-[40px] absolute">
    //       <img
    //         src={logo}
    //         alt="freshDataPoint"
    //         className="rounded-full"
    //         onClick={() => {
    //           navigate("/");
    //         }}
    //       />
    //     </div>
    //     <button onClick={() => navigate("/")} className="home__btn btn">
    //       <FaHome />
    //     </button>
    //     <h4 className="title">Reset Password</h4>
    //     <form className="" onSubmit={handleSubmit}>
    //       <FormInput
    //         name="email"
    //         value={email}
    //         placeholder="Enter your email"
    //         type="email"
    //         placeHolder="email"
    //         handleChange={handleInputChange}
    //       />
    //       <button type="submit" disabled={isLoading} className="btn">
    //         {isLoading ? "please wait..." : "submit"}
    //       </button>
    //     </form>
    //     <div className="new__user">
    //       <p>New user?</p>
    //       <button
    //         className="register__btn btn"
    //         onClick={() => navigate("/login")}
    //       >
    //         login
    //       </button>
    //     </div>
    //   </Wrapper>
    // </Container>
    <div className=" min-h-screen  flex  items-center gap-4 max-w-[var(--maxWidth)] pt-[4rem] md:pl-4 bg-[var(--primary-100)]">
      <Card className="border w-11/12 m-auto max-w-[400px] border-[var(--primary-300)]">
        <LandingNav />
        <div className="flex justify-between">
          <Avatar img={logo} rounded bordered />
          <Button
            disabled={isLoading}
            onClick={() => navigate("/")}
            className="btn "
          >
            <FaHome />
          </Button>
        </div>

        <h1 className="title">register</h1>
        <form className="flex max-w-md flex-col  gap-4" onSubmit={handleSubmit}>
          <FormInput
            name="email"
            value={email}
            placeholder="email or username"
            // type="email"
            placeHolder="email"
            handleChange={handleInputChange}
          />

          <Button
            disabled={isLoading}
            type="submit"
            className="btn text-center"
            isProcessing={isLoading}
          >
            <FaUserAlt className="mr-2 h-5 w-5" />
            submit{" "}
          </Button>

          <div className="flex items-center gap-2">
            {/* <Checkbox id="agree" /> */}
            <Label htmlFor="agree" className="flex justify-center ">
              <span>Already have an account&nbsp;</span>
              <Link
                className="text-cyan-600 hover:underline dark:text-cyan-500 capitalize"
                to="/login"
              >
                login to my account
              </Link>
            </Label>
          </div>
        </form>
      </Card>
      <Card className=" dark_mode hidden w-full  md:grid items-center bg-[var(--primary-700)] text-white self-stretch">
        <h2 className="title">
          We are always here to serve you better......{" "}
          <span className="italic">Reach out to us now</span>{" "}
        </h2>
      </Card>
    </div>
  );
}

export default RequestResetPassword;
