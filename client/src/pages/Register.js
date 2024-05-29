import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import logo from "../images/logo.png";
import { FaHome, FaUserAlt } from "react-icons/fa";
import { Container, Wrapper } from "./Login";
import FormInput from "../components/FormInput";
import { useGlobalContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { Avatar, Button, Card, Label } from "flowbite-react";
import { BsEyeSlash, BsPerson } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import LandingNav from "../components/LandingNav";
import { BiPhoneCall } from "react-icons/bi";
function Register() {
  const {
    setupUser,
    email,
    handleChange,
    phoneNumber,
    password,
    userName,
    passwordCheck,
    isLoading,
  } = useGlobalContext();
  const { referralId } = useParams();

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
    let currentUser = { userName, password, email, phoneNumber, passwordCheck };
    if (referralId) currentUser.referredBy = referralId;
    setupUser({ currentUser, endPoint: "register" });
  };
  return (
    <div className=" min-h-screen  flex  items-center gap-4 max-w-[var(--maxWidth)] pt-[4rem] md:pl-4 bg-[var(--primary-100)]">
      <Card className="border w-11/12 m-auto max-w-[400px] border-[var(--primary-300)] md:mt-8 md:mb-8">
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
            name="userName"
            value={userName}
            placeholder="username / business name"
            handleChange={handleInputChange}
            type="text"
            labelText="username/business name"
            icon={BsPerson}
          />

          <FormInput
            value={email}
            name="email"
            placeholder="email"
            handleChange={handleInputChange}
            type="email"
            placeHolder="email"
            icon={HiMail}
          />

          <FormInput
            value={phoneNumber}
            name="phoneNumber"
            placeholder="phone number"
            handleChange={handleInputChange}
            type="number"
            labelText="phone number"
            icon={BiPhoneCall}
          />

          <FormInput
            value={password}
            name="password"
            placeholder="password"
            handleChange={handleInputChange}
            type="password"
            placeHolder="password"
            icon={BsEyeSlash}
          />

          <FormInput
            value={passwordCheck}
            name="passwordCheck"
            placeholder="password"
            type="password"
            placeHolder="Re-enter password"
            handleChange={handleInputChange}
            icon={BsEyeSlash}
          />

          <Button
            disabled={isLoading}
            type="submit"
            className="btn text-center"
            isProcessing={isLoading}
          >
            <FaUserAlt className="mr-2 h-5 w-5" />
            register{" "}
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

export default Register;
