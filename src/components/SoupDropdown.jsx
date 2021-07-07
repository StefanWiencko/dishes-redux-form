import React from "react";
export const SoupDropdown = ({ register, errors }) => {
  return (
    <>
      <label htmlFor="spiciness_scale">Spicines in the scale of 1 to 10</label>
      <input
        type="number"
        min="1"
        max="10"
        name="spiciness_scale"
        {...register("spiciness_scale", {
          required: true,
          valueAsNumber: true,
        })}
      />
    </>
  );
};
