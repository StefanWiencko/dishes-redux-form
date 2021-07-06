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
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [responseStatus, setResponseStatus] = useState({});
  const canSend = addRequestStatus === "idle";
  const responseClasses = `responseStatus${
    responseStatus.status === "success" ? "success" : ""
  } ${responseStatus.status === "error" ? "error" : ""}`;
  const submitHandler = async (data) => {
    try {
      if (canSend) {
        setAddRequestStatus("pending");
        const resolut = await dispatch(postDishes(data));
        unwrapResult(resolut);
        reset();
        setResponseStatus({
          status: "success",
          message: "Your form has been submitted successfully! :)",
        });
      }
    } catch (error) {
      setResponseStatus({
        status: "error",
        message: "Submitting your form went wrong:",
      });
      console.error("Failed to send your form: ", error);
    } finally {
      setAddRequestStatus("idle");
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
        <p
          style={
            errors.name?.type === "required"
              ? { display: "block" }
              : { display: "none" }
          }
        >
          Dish name is required
        </p>
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
        <p
          style={
            errors.preparation_time?.type
              ? { display: "block" }
              : { display: "none" }
          }
        >
          Preparation time is required
        </p>
        <label htmlFor="type">Dish type</label>
        <select name="type" id="type" {...register("type", { required: true })}>
          <option></option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwitch</option>
        </select>
        <p
          style={
            errors.type?.type === "required"
              ? { display: "block" }
              : { display: "none" }
          }
        >
          Dish type is required
        </p>
        {watchDishType === "pizza" && (
          <PizzaDropdown register={register} errors={errors} />
        )}
        {watchDishType === "soup" && (
          <SoupDropdown register={register} errors={errors} />
        )}
        {watchDishType === "sandwich" && (
          <SandwichDropdown register={register} errors={errors} />
        )}
        <input type="submit" value="Submit" />
        <p className={responseClasses}>{responseStatus.message}</p>
      </form>
    </div>
  );
}

export default App;
