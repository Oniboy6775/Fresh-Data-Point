import { Button, Drawer } from "flowbite-react";
import React from "react";
import { HiBars2, HiSquaresPlus } from "react-icons/hi2";
import { useGlobalContext } from "../context/UserContext";
import { FaCopy, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const FundWalletDrawer = ({ isOpen, handleClose, close }) => {
  const { user } = useGlobalContext();
  const copyAccNo = async (number) => {
    window.navigator.clipboard.writeText(number);
    toast.success("Account number copied");
  };
  return (
    <Drawer
      edge
      open={isOpen}
      onClose={handleClose}
      position="bottom"
      className="p-3 dark_mode bg-[var(--primary-100)]"
      backdrop={true}
    >
      <Drawer.Header
        closeIcon={FaTimes}
        title={isOpen ? "Close" : "Fund wallet"}
        // titleIcon={HiBars2}

        onClick={close}
        className="cursor-pointer px-4 pt-4 flex justify-center hover:bg-gray-50 dark:hover:bg-gray-700"
      />
      <Drawer.Items className="p-4">
        <p className="font-bold text-center">
          Fund your wallet with any of these account numbers(Bank charges
          applies)
        </p>
        <div className="grid grid-cols-2 items-center gap-4 p-4 ">
          {user.accountNumbers.map((e) => {
            return (
              <div
                key={e.accountNumber}
                className="cursor-pointer rounded-lg bg-gray-50 p-4 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <p className="text-center">{e.bankName}</p>
                <div className="mx-auto mb-2 flex h-[48px] max-h-[48px] w-[48px] max-w-[48px] items-center justify-center rounded-full bg-gray-200 p-2 dark:bg-gray-600">
                  <svg
                    className="inline h-5 w-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                </div>
                <div className="text-center  font-medium text-gray-500 dark:text-gray-400">
                  {e.accountNumber}
                  <p className="text-sm ">
                    Account name <br /> freshDataPoint-
                    {user.userName && user.userName.substring(0, 10)}
                  </p>
                  <Button
                    onClick={() => copyAccNo(e.accountNumber)}
                    className="btn "
                  >
                    <FaCopy />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Drawer.Items>
    </Drawer>
  );
};

export default FundWalletDrawer;
