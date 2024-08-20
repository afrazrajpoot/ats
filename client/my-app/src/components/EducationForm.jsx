import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useGlobalContext } from "../context/useGlobal";
import { educationForm } from "../data";

const EducationForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { resumeData, setResumeData } = useGlobalContext();

  const onSubmit = (data) => {
    // console.log(data, "data");

    setResumeData((prev) => ({ ...prev, ...data })); // Set the form data to state
  };

  const generateYearOptions = (startYear, endYear) => {
    let years = [];
    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }
    return years;
  };
  //   console.log(resumeData, "mydata");
  return (
    <>
      <h1 className="text-3xl">Education</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-[2vw]">
        {educationForm?.map((elem, ind) => (
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
                    placeholder={elem.placeholder}
                    className={`p-2 border ${
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

        {/* End Year Select */}
        <div className="flex flex-col gap-2">
          <label htmlFor="endYear" className="text-lg">
            Pass Year
          </label>
          <Controller
            name="endYear"
            control={control}
            defaultValue=""
            rules={{ required: "End Year is required" }}
            render={({ field }) => (
              <Select
                {...field}
                id="endYear"
                // className={`p-2 border ${
                //   errors.endYear ? "border-red-500" : "border-gray-300"
                // } rounded-md`}
                className="w-full"
              >
                {generateYearOptions(2000, new Date().getFullYear()).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.endYear && <span className="text-red-500 text-sm">{errors.endYear.message}</span>}
        </div>

        {/* Full-time/Part-time Radio Buttons */}
        <div className="flex flex-col gap-2">
          <FormControl component="fieldset">
            <label htmlFor="endYear" className="text-lg">
              Education type
            </label>
            <Controller
              name="educationType"
              control={control}
              defaultValue="full-time"
              rules={{ required: "Education Type is required" }}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel value="full-time" control={<Radio />} label="Full-time" />
                  <FormControlLabel value="part-time" control={<Radio />} label="Part-time" />
                </RadioGroup>
              )}
            />
          </FormControl>
          {errors.educationType && (
            <span className="text-red-500 text-sm">{errors.educationType.message}</span>
          )}
        </div>

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

export default EducationForm;
