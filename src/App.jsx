import { useState } from "react";
import { useForm } from "react-hook-form";
import { PizzaDropdown } from "./components/PizzaDropdown";
import { SandwichDropdown } from "./components/SandwichDropdown";
import { SoupDropdown } from "./components/SoupDropdown";
import { ClockSvg } from "./components/ClockSvg";
import { postDishes } from "./redux/dishesSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

function App() {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const watchDishType = watch("type", false);
  const dispatch = useDispatch();
  const [responseStatus, setResponseStatus] = useState({ isIdle: "idle" });
  const canSend = responseStatus.isIdle === "idle";
  const responseClasses = () => {
    if (responseStatus.status === "pending") return "responseStatus pending";
    if (responseStatus.status === "success") return "responseStatus success";
    if (responseStatus.status === "error") return "responseStatus error";
    return "responseStatus";
  };
  const submitHandler = async (data) => {
    try {
      if (canSend) {
        setResponseStatus({
          ...responseStatus,
          isIdle: "pending",
          status: "pending",
        });
        const resolut = await dispatch(postDishes(data));
        unwrapResult(resolut);
        reset();
        setResponseStatus({
          ...responseStatus,
          status: "success",
          message: "Your form has been submitted successfully! :)",
        });
      }
    } catch (error) {
      setResponseStatus({
        ...responseStatus,
        status: "error",
        message: "Submitting your form went wrong:",
      });
      console.error("Failed to send your form: ", error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitHandler)}>
        <label htmlFor="name">Dish name</label>
        <input
          type="text"
          name="name"
          {...register("name", { required: true })}
        />
        <label htmlFor="preparation_time">Preparation time</label>
        <div>
          <ClockSvg />
          <input
            type="time"
            step="1"
            name="preparation_time"
            {...register("preparation_time", { required: true })}
          />
        </div>
        <label htmlFor="type">Dish type</label>
        <select name="type" id="type" {...register("type", { required: true })}>
          <option></option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwitch</option>
        </select>
        {watchDishType === "pizza" && (
          <PizzaDropdown register={register} errors={errors} />
        )}
        {watchDishType === "soup" && (
          <SoupDropdown register={register} errors={errors} />
        )}
        {watchDishType === "sandwich" && (
          <SandwichDropdown register={register} errors={errors} />
        )}
        <p>
          Required fields <span>*</span>
        </p>
        <input type="submit" value="Submit" />
      </form>
      <div className={responseClasses()}></div>
    </div>
  );
}

export default App;
