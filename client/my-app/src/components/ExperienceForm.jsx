import React, { useState } from "react";
import { experienceForm } from "../data";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useGlobalContext } from "../context/useGlobal";
const ExperienceForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { resumeData, setResumeData } = useGlobalContext();

  const onSubmit = (data) => {
    // console.log(data);
    setResumeData((prev) => ({ ...prev, ...data })); // Set the form data to state
  };
  //   console.log(resumeData);
  return (
    <>
      <h1 className="text-3xl">Experience</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-[2vw]">
        {experienceForm?.map((elem, ind) => (
          <div key={ind} className="flex flex-col gap-2">
            <label htmlFor={elem.name} className="text-lg">
              {elem.lable}
            </label>
            {elem.type === "textarea" ? (
              <Controller
                name={elem.name}
                control={control}
                defaultValue=""
                rules={{
                  required: `${elem?.rules?.required} is required`,
                }}
                render={({ field }) => (
                  <textarea
                    rows={5}
                    {...field}
                    id={elem.name}
                    type={elem.type}
                    placeholder={elem.placeholder}
                    className={`p-2 border  ${
                      errors[elem.name] ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                )}
              />
            ) : (
              <Controller
                name={elem.name}
                control={control}
                defaultValue=""
                rules={{
                  required: `${elem?.rules?.required} is required`,
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    id={elem.name}
                    type={elem.type}
                    style={{ borderRadius: "0.3vw" }}
                    placeholder={elem.placeholder}
                    className={`p-[0.9vw]   border mb-[1vw] ${
                      errors[elem.name] ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                  />
                )}
              />
            )}
            {errors[elem.name] && (
              <span className="text-red-500 text-sm">{errors[elem.name].message}</span>
            )}
          </div>
        ))}
        <Button
          type="submit"
          variant="contained"
          style={{ marginTop: "1vw" }}
          sx={{ backgroundColor: "#4CAF50", color: "white" }}
        >
          Save
        </Button>
      </form>
    </>
  );
};

export default ExperienceForm;
