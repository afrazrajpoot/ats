import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Layout from "../components/Layout";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { apiUrl } from "../libs/config";
import { useAuth } from "../providers/AuthProvider";
import { ButtonLoader } from "../components/ButtonLoader";
import { Avatar, TextField, Button, Box } from "@mui/material";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaUpload } from "react-icons/fa";
import { motion } from "framer-motion";

const RecruiterSignup = () => {
  const { tokenInLocal } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState();
  const baseUrl = import.meta.env.VITE_API_URL || apiUrl;

  const mutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      });
      if (file) {
        formData.append("img", file);
      }
      const response = await axios.post(`${baseUrl}/recruiterRegister`, formData);
      return response;
    },
    onSuccess: (data) => {
      tokenInLocal(data?.data?.data?.user);
      toast.success("Successful signup", {
        position: "top-center",
      });
    },
    onError: (error) => {
      toast.error("Error in signup", {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        document.getElementById("profile-pic").src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url("images/world-web-search-engine.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="relative bg-white bg-opacity-80 rounded-lg shadow-xl p-12 w-full max-w-2xl backdrop-blur-md transition-transform transform">
          <h1 className="text-3xl font-bold mb-4 text-center">Register as Recruiter</h1>
          <p className="text-center mb-6">
            Fill up these details to start using the services from MatrixTech
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center mb-6">
              <label htmlFor="photo" className="relative cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative cursor-pointer"
                >
                  <Avatar sx={{ width: 100, height: 100, position: "relative" }}>
                    <img
                      id="profile-pic"
                      src={"images/dummy-upload.jpg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <FaUpload className="absolute bottom-0 right-0 text-white text-2xl m-2" />
                  </Avatar>
                </motion.div>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: "First name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="First Name"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  InputProps={{
                    startAdornment: <FaUser className="mr-2 text-gray-400" />,
                  }}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: "Last name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Last Name"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  InputProps={{
                    startAdornment: <FaUser className="mr-2 text-gray-400" />,
                  }}
                />
              )}
            />

            <div className="flex space-x-2">
              <Controller
                name="countryCode"
                control={control}
                defaultValue="+1"
                render={({ field }) => (
                  <select {...field} className="border rounded p-2">
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+91">🇮🇳 +91</option>
                    {/* Add more countries as needed */}
                  </select>
                )}
              />
              <Controller
                name="contactNumber"
                control={control}
                defaultValue=""
                rules={{ required: "Contact number is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="tel"
                    label="Contact Number"
                    error={!!errors.contactNumber}
                    helperText={errors.contactNumber?.message}
                    InputProps={{
                      startAdornment: <FaPhone className="mr-2 text-gray-400" />,
                    }}
                  />
                )}
              />
            </div>

            <Controller
              name="location"
              control={control}
              defaultValue=""
              rules={{ required: "Current location is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Current Location"
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  InputProps={{
                    startAdornment: <FaMapMarkerAlt className="mr-2 text-gray-400" />,
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
                  type="email"
                  label="Verify Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: <FaEnvelope className="mr-2 text-gray-400" />,
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
        </div>
      </Box>
    </Layout>
  );
};

export default RecruiterSignup;
