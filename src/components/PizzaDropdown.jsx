import React from "react";
export const PizzaDropdown = ({ register, errors }) => {
  return (
    <>
      <label htmlFor="no_of_slices">Number of slices</label>
      <input
        type="number"
        min="0"
        name="no_of_slices"
        {...register("no_of_slices", { required: true, valueAsNumber: true })}
      />

      {errors.no_of_slices?.type === "required" && (
        <p> "Number of slices is required"</p>
      )}

      <label htmlFor="diameter">Pizza diameter</label>
      <input
        type="number"
        min="0"
        step="0.1"
        name="diameter"
        placeholder="In centimeters"
        {...register("diameter", { required: true, valueAsNumber: true })}
      />
    </>
  );
};
