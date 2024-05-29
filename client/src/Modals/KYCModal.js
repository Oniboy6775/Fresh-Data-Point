import React, { useState } from "react";
import { useGlobalContext } from "../context/UserContext";
import { Modal } from "../components/Modal";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";

const KYCModal = ({ close }) => {
  const { user, updateKyc, handleChange, bvn, nin } = useGlobalContext();
  const [kycModal, setKycModal] = useState(false);
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bvn && !nin) return toast.warning("Enter your BVN or your NIN");
    updateKyc();
    close();
  };
  return (
    <div>
      {" "}
      <Modal
        title="Do Your KYC"
        children={
          <>
            <p className="text-bold text-center">
              Provide your NIN and/or BVN to enjoy the most out of our platform
            </p>
            <FormInput
              name="nin"
              className="text-left"
              labelText="NIN"
              handleChange={handleInputChange}
              value={nin}
            />
            <p className="text-bold text-2xl ">OR</p>
            <FormInput
              name="bvn"
              className="text-left"
              labelText="BVN"
              handleChange={handleInputChange}
              value={bvn}
            />
          </>
        }
        buttons={[
          {
            name: "close",
            className: "btn-danger",
            handleClick: close,
          },
          { name: "submit", handleClick: handleSubmit },
        ]}
      />
    </div>
  );
};

export default KYCModal;
