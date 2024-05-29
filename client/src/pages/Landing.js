import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

import { FaClipboardList, FaUserAlt, FaTimes } from "react-icons/fa";
// import SmallNav from "../components/SmallNav";
import LandingNav from "../components/LandingNav";
import { useGlobalContext } from "../context/UserContext";
import airtimeSvg from "../images/airtime.svg";
import dataSvg from "../images/data.svg";
import electricitySvg from "../images/electricity.svg";
import { Accordion, Button, ButtonGroup, Card } from "flowbite-react";
import WelcomeBanner from "../components/WelcomeBanner";
const Landing = () => {
  const { user, token } = useGlobalContext();
  const navigate = useNavigate();

  const services = [
    {
      name: "airtime",
      icon: airtimeSvg,
      desc: "With Our Fast And Easy Service, Your Airtime Will Be Brand New!!!",
    },
    {
      name: "data",
      icon: dataSvg,
      desc: " Want To Help Your Friends And Family Connected? With Our Data Bundle Service, You Can Do Just That!!!",
    },
    {
      name: "electricity token",
      icon: electricitySvg,
      desc: "Conveniently pay your TV subscription ",
    },
    {
      name: "electricity token",
      icon: electricitySvg,
      desc: "With Our Easy-To-Use Service, You Can Top-Up Your Electricity Account Without The Hassle Of Going To A Store Or Waiting Inline",
    },
  ];
  const faqData = [
    {
      title: "Benefits of using our website?",
      desc: "Convenient, easy-to-use, competitive prices, wide product range, secure transactions, fast & efficient service.",
      isActive: false,
    },

    {
      title: "Is registration free?",
      desc: "Yes, registration is completely free.",
      isActive: false,
    },
    {
      title: "What payment methods do you accept?",
      desc: "We accept debit/credit cards, bank transfers, and mobile money for your convenience.",
      isActive: false,
    },
    {
      title: "How do I create an account?",
      desc: "Click the 'Register' button and follow the simple steps to create your account.",
      isActive: false,
    },
    {
      title: "How to top up my account balance?",
      desc: "Top up your account balance using any of our supported payment methods.",
      isActive: false,
    },
    {
      title: "How to purchase data, airtime, or other VTU services?",
      desc: "Browse and select the desired product/service, enter recipient details, choose payment method, and click 'Purchase'.",
      isActive: false,
    },
    {
      title: "Transaction processing time?",
      desc: "Most transactions are processed within seconds, slight delays depending on payment method and network.",
      isActive: false,
    },
    {
      title: "What happens if my transaction fails?",
      desc: "Contact our customer support for assistance. We will investigate and resolve the issue promptly. **We will also refund any failed transactions automatically.**",
      isActive: false,
    },
    {
      title: "Do you offer discounts or promotions?",
      desc: "Yes, we regularly offer discounts and promotions. Check our website or social media pages for current offers.",
      isActive: false,
    },
    {
      title: "Can I become a reseller?",
      desc: "Yes, we offer a reseller program where you can earn commissions by selling our products and services.",
      isActive: false,
    },
    {
      title: "Do you have an API?",
      desc: "Yes, we offer an API to integrate our VTU services into your website or application.",
      isActive: false,
    },
    {
      title: "What data plans do you offer?",
      desc: "We offer a wide range of data plans for various networks and devices.",
      isActive: false,
    },
    {
      title: "How to activate my data plan?",
      desc: "Once purchased, your data plan will be automatically activated on the recipient's phone number.",
      isActive: false,
    },
    {
      title: "What airtime denominations are available?",
      desc: "We offer airtime denominations for all major networks.",
      isActive: false,
    },
    {
      title: "How to top up someone's airtime?",
      desc: "Enter recipient's phone number, choose desired airtime denomination, and select your preferred payment method.",
      isActive: false,
    },
    {
      title: "What VTU services do you offer?",
      desc: "We offer a wide range of VTU services, including bill payments for electricity, cable TV, internet, and more.",
      isActive: false,
    },
    {
      title: "How to pay my bills using your website?",
      desc: "Select desired bill payment service, enter your account details, choose payment amount, and select your preferred payment method.",
      isActive: false,
    },
  ];
  const [faqs, setFaqs] = useState(faqData);

  const links = [
    { name: "home", link: "/" },
    { name: "login", link: "/login" },
    { name: "register", link: "/register" },
    { name: "pricing", link: "/priceList" },
  ];
  return (
    <div className="relative w-full">
      <div className=" flex flex-col ">
        <LandingNav />
        <WelcomeBanner />
      </div>

      <section>
        <div className="skewed"></div>
      </section>
      <section className="mt-[80px]  m-auto  max-w-[var(--max-width)]  flex flex-col md:flex-row md:items-stretch gap-4 w-10/12 h-full">
        <div className="md:w-6/12 ">
          <h1 className="font-extrabold text-transparent text-center md:text-6xl bg-clip-text bg-gradient-to-r from-purple-600 to-pink-400">
            {" "}
            {token ? `Hi ${user.userName}, ` : ""}Welcome to freshDataPoint
          </h1>
          <p className="text-center text-3xl md:text-3xl">
            A technology platform that offers solutions to digital needs at best
            possible price without compromising quality.
          </p>
          <ButtonGroup className=" flex justify-center gap-4">
            <Button
              // size="sm"
              // isProcessing
              color="btn"
              className=" btn"
              onClick={() => navigate(`${token ? "/profile" : "/login"}`)}
            >
              <FaUserAlt className="mr-2" />
              {token ? "Dashboard" : "Login/Register"}
            </Button>
            <Button
              color=""
              className="  btn btn-hipster "
              onClick={() => navigate("/priceList")}
            >
              <FaClipboardList className="mr-2" />
              Price list
            </Button>
          </ButtonGroup>
        </div>
        <div className="">
          <img src="./assets/phone3.png" alt="" className="w-[80%]" />
        </div>
      </section>

      <section className="text-center flex flex-col justify-center items-center">
        <h2 className="title text-center underline"> services</h2>
        <div className="md:flex max-w-[var(--max-width)] md:gap-5  md:justify-center w-[80%]  m-auto md:m-0 ">
          {services.map((e) => {
            return (
              <Card
                key={e.name}
                className=" w-full  dark_mode border-t-8 border-t-purple-800 text-center mt-8 p-4 rounded-md shadow-md border hover:shadow-xl"
              >
                <div className="max-w-[80px] m-auto">
                  <img src={e.icon} alt="" className="img" />
                </div>
                <p className="font-bold capitalize text-sm">{e.name}</p>
                <p>{e.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mt-10 max-w-[var(--max-width)] w-11/12 m-auto">
        <h2 className="title text-center underline">FAQ</h2>
        {/* <div className="flex flex-col gap-4 ">
          {faqs.map((e, index) => {
            return (
              <div
                onClick={() => handleFaqClick(index)}
                key={e.desc}
                className=" border-2 rounded relative  p-3 "
              >
                {e.isActive ? (
                  <IoIosArrowDropup className=" text-4xl absolute top-2 right-4" />
                ) : (
                  <IoIosArrowDropdown className="text-4xl absolute top-2 right-4" />
                )}
                <h4 className="font-bold text-lg text-purple-500">{e.title}</h4>
                {e.isActive && (
                  <p className="text-center font-bold">{e.desc}</p>
                )}
              </div>
            );
          })}
        </div> */}
        <Accordion>
          {faqData.map((e, index) => {
            return (
              <Accordion.Panel key={index}>
                <Accordion.Title className="text-[var(--primary-500)]">
                  <p className="text-lg">{e.title}</p>
                </Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    {e.desc}
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            );
          })}
        </Accordion>
      </section>
      <section className="mt-5 bg-black   text-white border items-center pb-[4rem]">
        <div className="p-4  max-w-[1300px] m-auto w-11/12">
          <div className=" flex justify-between gap-8 md:gap-0 items-center capitalize mb-4">
            <div className="rounded-full hidden w-48 md:block">
              <img src="./assets/logo.png" alt="" className="img" />
            </div>
            <div className="">
              <ul className="underline">
                {links.map((e, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => navigate(e.link)}
                      className="p-2 text-lg cursor-pointer"
                    >
                      {e.name}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="">
              <div className=" ">
                <p className="uppercase text-blue-500">Office address</p>
                <p>No 1, Zone A, Odo - Efo Osere Ilorin</p>
              </div>
              <div className=" ">
                <p className="uppercase text-blue-500">phone number</p>
                <p>07035236371</p>
              </div>
              <div className=" lowercase">
                <p className="uppercase text-blue-500">Contact us</p>
                <p>admin@freshDataPoint.com.ng</p>
                <p>horlaseriolayinka@gmail.com</p>
              </div>
            </div>
          </div>
          <p className="text-center capitalize">
            All right reserved &copy; {new Date().getFullYear()} Designed &
            developed by{" "}
            <a
              className="text-blue-500"
              href="https://onisabi-portfolio.netlify.app/"
              target="blank"
            >
              Oniboy
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
