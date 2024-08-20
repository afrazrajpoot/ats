import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { jobApplyData } from "../data/index";
import { Button, Divider, TextField, InputAdornment, Box, Paper } from "@mui/material";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiUrl } from "../libs/config";
import axios from "axios";
import { useAuth } from "../providers/AuthProvider";
import Loader from "../components/Loader";
import { ButtonLoader } from "../components/ButtonLoader";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { FaFileUpload, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

const JobApply = () => {
  const [render, setRender] = useState(false);
  const { id } = useParams();
  const ref = useRef(null);
  const [fileName, setFileName] = useState("");
  const { loginUser } = useAuth();
  const baseUrl = apiUrl;

  const mutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("firstName", data?.firstName);
      formData.append("lastName", data?.lastName);
      formData.append("email", data?.email);
      formData.append("phoneNumber", data?.phoneNumber);
      formData.append("currentCompany", data?.currentCompany);
      formData.append("coverLetter", data?.coverLetter);
      formData.append("address", data?.address);
      formData.append("resume", ref.current.files[0]);

      const response = await axios.post(`${baseUrl}/apply-job/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${loginUser?.token}`,
        },
      });
      return response;
    },
    onSuccess: () => {
      reset();
      toast.success("Job application submitted successfully!", {
        duration: 3000,
        icon: "success",
        position: "top-center",
        autoClose: true,
      });
    },
    onError: (error) => {
      toast.error("Failed to submit job application: " + error.message, {
        duration: 3000,
        position: "top-center",
        autoClose: true,
      });
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  setTimeout(() => {
    setRender(true);
  }, 5000);

  return (
    <>
      {!render ? (
        <Loader />
      ) : (
        <Layout>
          <Box
            sx={{
              minHeight: "100vh",
              backgroundImage: `url("/images/World-Map-Search-engine.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              display: "flex",
              alignItems: "center",
              py: 6,
              marginTop: "3vw",
            }}
          >
            <motion.main
              className="w-full p-4 "
              style={{
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <motion.article
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-8  bg-opacity-90 rounded-lg shadow-lg max-w-3xl mx-auto"
              >
                <Paper
                  elevation={6}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                  }}
                >
                  <div className="w-full">
                    <h1 className="text-4xl mb-6 text-center font-bold text-blue-600">
                      Job Application
                    </h1>
                    <p className="text-center mb-8 text-lg text-gray-700">
                      Please fill out the form below to apply for the job. We look forward to
                      reviewing your application.
                    </p>
                    <Divider className="mb-8" />
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {jobApplyData?.slice(0, 4).map((elem, ind) => (
                          <Controller
                            key={ind}
                            name={elem.name}
                            control={control}
                            defaultValue=""
                            rules={{ required: `${elem.label} is required` }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label={elem.label}
                                type={elem.type}
                                placeholder={elem.placeholder}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                error={Boolean(errors[elem.name])}
                                helperText={errors[elem.name]?.message}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      {elem.type === "text" && <FaBriefcase />}
                                      {elem.type === "email" && <FaEnvelope />}
                                      {elem.type === "tel" && <FaPhone />}
                                      {elem.type === "address" && <FaMapMarkerAlt />}
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            )}
                          />
                        ))}
                      </div>
                      <div className="mb-6">
                        {jobApplyData?.slice(4).map((elem, ind) => (
                          <Controller
                            key={ind}
                            name={elem.name}
                            control={control}
                            defaultValue=""
                            rules={{ required: `${elem.label} is required` }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                label={elem.label}
                                type={elem.type}
                                placeholder={elem.placeholder}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                multiline={elem.type === "textarea"}
                                rows={elem.type === "textarea" ? 4 : 1}
                                error={Boolean(errors[elem.name])}
                                helperText={errors[elem.name]?.message}
                              />
                            )}
                          />
                        ))}
                      </div>
                      <Controller
                        name="coverLetter"
                        control={control}
                        defaultValue=""
                        rules={{ required: `Cover letter is required` }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Cover Letter"
                            type="text"
                            placeholder="Cover Letter"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={5}
                            error={Boolean(errors.coverLetter)}
                            helperText={errors.coverLetter?.message}
                          />
                        )}
                      />
                      <div
                        className="mt-6 p-4 text-center border-dashed border-2 border-gray-400 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors"
                        onClick={() => ref.current.click()}
                      >
                        <label className="block text-lg font-medium mb-2 text-gray-700">
                          {fileName || "Upload Resume"}
                        </label>
                        <FaFileUpload className="text-2xl text-gray-500" />
                      </div>
                      <input
                        type="file"
                        hidden
                        ref={ref}
                        name="resume"
                        onChange={handleFileChange}
                      />
                      <div className="mt-6 text-center">
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className="w-full"
                          startIcon={mutation.isPending ? <ButtonLoader /> : null}
                        >
                          Apply
                        </Button>
                      </div>
                    </form>
                  </div>
                </Paper>
              </motion.article>
            </motion.main>
          </Box>
        </Layout>
      )}
    </>
  );
};

export default JobApply;
