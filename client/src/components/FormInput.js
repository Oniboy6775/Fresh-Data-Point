import { FloatingLabel, Label, TextInput } from "flowbite-react";
import React from "react";
const FormInput = ({
  labelText,
  value,
  name,
  type,
  placeholder,
  handleChange,
  disabled,
  min,
  max,
  className,
  icon,
}) => {
  return (
    // <div className={`form-row text-black ${className}`}>
    //   <label htmlFor="" className="form-label">
    //     {labelText ? labelText : name}
    //   </label>
    //   <input
    //     onChange={handleChange}
    //     type={type}
    //     className="form-input "
    //     name={name}
    //     value={value}
    //     placeholder={placeholder && placeholder}
    //     disabled={disabled}
    //     min={min}
    //     max={max}
    //     // valueAsNumber={true}
    //   />
    // </div>
    // <form className={`flex max-w-md flex-col gap-4 ${className}`}>
    <div className="w-full my-2">
      <div className="mb-2 block">
        <FloatingLabel
          onChange={handleChange}
          variant="filled"
          label={labelText || placeholder}
          id={type}
          // placeholder={placeholder || labelText}
          type={type}
          icon={icon}
          name={name}
          value={value}
          disabled={disabled}
          min={min}
          max={max}
          className="text-lg"
        />
      </div>
      {/* <TextInput
        id={type}
        placeholder={placeholder || labelText}
        required
        onChange={handleChange}
        type={type}
        // className={className}
        icon={icon}
        name={name}
        value={value}
        disabled={disabled}
        min={min}
        max={max}
        // valueAsNumber={true}
      /> */}
    </div>
  );
};
export default FormInput;
