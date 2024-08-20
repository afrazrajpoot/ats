import React from "react";
import { useForm, Controller } from "react-hook-form";
import { jobPost } from "../data/index";
import { Button, TextField, Paper, Container, Typography, Box, Grid } from "@mui/material";
import Layout from "../components/Layout";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUrl } from "../libs/config";
import axios from "axios";
import { useAuth } from "../providers/AuthProvider";
import { ButtonLoader } from "../components/ButtonLoader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaExclamationCircle,
  FaFileAlt,
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const JobPost = () => {
  const { loginUser } = useAuth();
  const baseUrl = apiUrl;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${baseUrl}/job-post`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${loginUser?.token}`,
          },
        }
      );
      return response;
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(["jobs"]);
      navigate("/jobs");
      toast.success("Job posted successfully!", {
        duration: 3000,
        icon: "🎉",
        position: "top-center",
        autoClose: true,
      });
    },
    onError: (error) => {
      toast.error("Failed to post job: " + error.message, {
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

  const getIcon = (name) => {
    switch (name) {
      case "title":
        return <FaBriefcase />;
      case "location":
        return <FaMapMarkerAlt />;
      case "salary":
        return <FaMoneyBillWave />;
      default:
        return <FaExclamationCircle />;
    }
  };

  return (
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
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
              <Typography
                variant="h3"
                sx={{
                  mb: 3,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#2d3748",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <FaPlus style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
                Post a Job
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, textAlign: "center", color: "#4a5568" }}>
                Fill in the details below to post a new job. Ensure all required fields are
                completed.
              </Typography>
              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={3}>
                  {jobPost?.map((elem, ind) => (
                    <Grid item xs={12} md={ind < 2 ? 6 : 12} key={ind}>
                      <Controller
                        name={elem.name}
                        control={control}
                        defaultValue=""
                        rules={{ required: `${elem.lable} is required` }}
                        render={({ field }) => (
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                mb: 1,
                                fontWeight: "medium",
                                display: "flex",
                                alignItems: "center",
                                color: "#2d3748",
                              }}
                            >
                              {getIcon(elem.name)}
                              <span style={{ marginLeft: "0.5rem" }}>{elem.lable}</span>
                            </Typography>
                            <TextField
                              {...field}
                              type={elem.type}
                              placeholder={elem.placeholder}
                              variant="outlined"
                              fullWidth
                              size="small"
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                                  "& fieldset": { borderColor: "#a0aec0" },
                                  "&:hover fieldset": { borderColor: "#4a5568" },
                                  "&.Mui-focused fieldset": { borderColor: "#4299e1" },
                                },
                              }}
                            />
                            {errors[elem.name] && (
                              <Typography variant="caption" sx={{ color: "#e53e3e", mt: 0.5 }}>
                                {errors[elem.name].message}
                              </Typography>
                            )}
                          </Box>
                        )}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Controller
                      name="description"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Description is required" }}
                      render={({ field }) => (
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              mb: 1,
                              fontWeight: "medium",
                              display: "flex",
                              alignItems: "center",
                              color: "#2d3748",
                            }}
                          >
                            <FaFileAlt style={{ marginRight: "0.5rem" }} />
                            Description
                          </Typography>
                          <TextField
                            {...field}
                            placeholder="Job Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={5}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                "& fieldset": { borderColor: "#a0aec0" },
                                "&:hover fieldset": { borderColor: "#4a5568" },
                                "&.Mui-focused fieldset": { borderColor: "#4299e1" },
                              },
                            }}
                          />
                          {errors.description && (
                            <Typography variant="caption" sx={{ color: "#e53e3e", mt: 0.5 }}>
                              {errors.description.message}
                            </Typography>
                          )}
                        </Box>
                      )}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={mutation.isPending}
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      borderRadius: 2,
                      textTransform: "none",
                      backgroundColor: "#4299e1",
                      "&:hover": {
                        backgroundColor: "#3182ce",
                      },
                      boxShadow: "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
                      transition: "all 0.2s",
                    }}
                  >
                    {mutation.isPending ? <ButtonLoader /> : "Post Job"}
                  </Button>
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </Layout>
  );
};

export default JobPost;
