import React from "react";
export const SandwichDropdown = ({ register, errors }) => {
  return (
    <>
      <label htmlFor="slices_of_bread">Number of slices</label>
      <input
        type="number"
        min="0"
        name="slices_of_bread"
        {...register("slices_of_bread", {
          required: true,
          valueAsNumber: true,
        })}
      />
      <p
        style={
          errors.slices_of_bread?.type === "required"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        Set the number of slices
      </p>
    </>
  );
};
