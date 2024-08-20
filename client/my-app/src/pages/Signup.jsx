import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Layout from "../components/Layout";
import { Avatar, TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../providers/AuthProvider";
import { apiUrl } from "../libs/config";
import { ButtonLoader } from "../components/ButtonLoader";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaUpload, FaSignInAlt } from "react-icons/fa";

const Signup = () => {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState("");
  const ref = useRef(null);
  const { tokenInLocal, loginUser } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function handleFile(e) {
    setFile(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
  }

  const baseUrl = import.meta.env.VITE_API_URL || apiUrl;
  const mutation = useMutation({
    mutationKey: "signup",
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("img", file);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await axios.post(`${baseUrl}/register`, formData);
      return response;
    },
    onSuccess: (data) => {
      toast.success("Signup successful!", {
        position: "top-center",
      });
      tokenInLocal(data?.data?.data?.user);
      setUrl(data?.data?.data?.user?.img);
      setFile("");
    },
    onError: (error) => {
      toast.error("Error: " + error.message, {
        position: "top-center",
      });
    },
    onSettled: () => {
      reset();
    },
  });

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords must match", {
        position: "top-center",
      });
      return;
    }
    mutation.mutate(data);
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url("images/world-web-search-engine.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: "2.5vw",
          backgroundAttachment: "fixed",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-80 rounded-lg shadow-xl p-8 w-full max-w-md"
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "#3f51b5", fontWeight: "bold" }}
          >
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Box className="flex justify-center mb-6">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => ref.current.click()}
              >
                <Avatar sx={{ width: 100, height: 100, cursor: "pointer", position: "relative" }}>
                  <img
                    src={url || loginUser?.user?.img || "images/dummy-upload.jpg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <FaUpload className="absolute bottom-0 right-0 text-white text-2xl m-2" />
                </Avatar>
              </motion.div>
              <input type="file" onChange={handleFile} hidden ref={ref} />
            </Box>

            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Username"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  InputProps={{
                    startAdornment: <FaUser className="mr-2 text-gray-400" />,
                  }}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: <FaEnvelope className="mr-2 text-gray-400" />,
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  label="Password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: <FaLock className="mr-2 text-gray-400" />,
                  }}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{ required: "Confirm Password is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    startAdornment: <FaLock className="mr-2 text-gray-400" />,
                  }}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <ButtonLoader /> : "Sign Up"}
            </Button>
          </form>

          <Typography variant="body2" align="center" className="mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </Typography>
        </motion.div>
      </Box>
    </Layout>
  );
};

export default Signup;
