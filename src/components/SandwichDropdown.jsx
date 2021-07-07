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
    </>
  );
};
