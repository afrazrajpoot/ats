import React, { useRef } from "react";
import Layout from "../components/Layout";
import { Avatar, Button, Divider, Paper, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { resumeForm } from "../data/index";
import ImageCroper from "../components/ImageCroper";
import { useGlobalContext } from "../context/useGlobal";
import generateResumePDF from "../libs/generateResumePDF";
import ExperienceForm from "../components/ExperienceForm";
import CvTemplate from "../components/CvTemplate";
import EducationForm from "../components/EducationForm";
import SkillsForm from "../components/SkillsForm";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaDownload,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaCogs,
} from "react-icons/fa";

const CreateResume = () => {
  const { profileImage, resumeData, setResumeData } = useGlobalContext();
  const fileRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setResumeData((prev) => ({ ...prev, ...data }));
  };

  return (
    <Layout>
      <main className="flex justify-between mt-[5vw] p-8 bg-gray-100 min-h-screen">
        <section className="w-1/2 pr-8">
          <Paper elevation={3} className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="contained"
                onClick={() => navigate("/")}
                startIcon={<FaArrowLeft />}
                sx={{ backgroundColor: "#3f51b5" }}
              >
                Back
              </Button>
              <Typography variant="h4" component="h1" className="font-bold text-blue-600">
                Create Your Resume
              </Typography>
            </div>

            <div className="flex justify-between mb-6">
              <img
                src="/img/template1.png"
                alt="Template 1"
                className="w-[48%] rounded-lg shadow-md"
              />
              <img
                src="/img/template2.png"
                alt="Template 2"
                className="w-[48%] rounded-lg shadow-md"
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <ImageCroper />

              <Divider />

              <Typography
                variant="h5"
                component="h2"
                className="flex items-center font-semibold text-gray-700"
              >
                <FaUser className="mr-2" /> Personal Details
              </Typography>

              {resumeForm?.map((elem, ind) => (
                <div key={ind} className="space-y-2">
                  <label htmlFor={elem.name} className="block text-sm font-medium text-gray-700">
                    {elem.lable}
                  </label>
                  <Controller
                    name={elem.name}
                    control={control}
                    defaultValue=""
                    rules={{ required: `${elem?.rules?.required} is required` }}
                    render={({ field }) =>
                      elem.type === "tel" ? (
                        <PhoneInput
                          {...field}
                          country={"us"}
                          inputProps={{ name: elem.name, id: elem.name }}
                          containerClass="w-full"
                          inputStyle={{ width: "100%", height: "40px" }}
                        />
                      ) : elem.type === "textarea" ? (
                        <textarea
                          {...field}
                          id={elem.name}
                          rows={5}
                          placeholder={elem.placeholder}
                          className={`w-full p-2 border rounded-md ${
                            errors[elem.name] ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                      ) : (
                        <input
                          {...field}
                          id={elem.name}
                          type={elem.type}
                          placeholder={elem.placeholder}
                          className={`w-full p-2 border rounded-md ${
                            errors[elem.name] ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                      )
                    }
                  />
                  {errors[elem.name] && (
                    <p className="text-red-500 text-xs italic">{errors[elem.name].message}</p>
                  )}
                </div>
              ))}

              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#4CAF50", color: "white" }}
                fullWidth
              >
                Save Personal Details
              </Button>
            </form>
          </Paper>

          <Paper elevation={3} className="p-6 mb-6">
            <Typography
              variant="h5"
              component="h2"
              className="flex items-center font-semibold text-gray-700 mb-4"
            >
              <FaBriefcase className="mr-2" /> Work Experience
            </Typography>
            <ExperienceForm />
          </Paper>

          <Paper elevation={3} className="p-6 mb-6">
            <Typography
              variant="h5"
              component="h2"
              className="flex items-center font-semibold text-gray-700 mb-4"
            >
              <FaGraduationCap className="mr-2" /> Education
            </Typography>
            <EducationForm />
          </Paper>

          <Paper elevation={3} className="p-6">
            <Typography
              variant="h5"
              component="h2"
              className="flex items-center font-semibold text-gray-700 mb-4"
            >
              <FaCogs className="mr-2" /> Skills
            </Typography>
            <SkillsForm />
          </Paper>
        </section>

        <section className="w-1/2 pl-8">
          <Paper elevation={3} className="p-6 sticky top-8">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h5" component="h2" className="font-semibold text-gray-700">
                Resume Preview
              </Typography>
              {profileImage && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => generateResumePDF(profileImage, resumeData)}
                  startIcon={<FaDownload />}
                >
                  Download PDF
                </Button>
              )}
            </div>
            <div className="border rounded-lg overflow-hidden">
              <CvTemplate />
            </div>
          </Paper>
        </section>
      </main>
    </Layout>
  );
};

export default CreateResume;
