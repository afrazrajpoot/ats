import React from "react";
import Layout from "../components/Layout";
import { apiUrl } from "../libs/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { Paper, TextField, Button, Typography, Box, Container } from "@mui/material";

const Signin = () => {
  const { control, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { tokenInLocal } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${apiUrl}/login`, {
        ...data,
        userType: localStorage.getItem("userType"),
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data?.data?.user, "login data");
      tokenInLocal(data?.data?.user);
      toast.success("Sign In successful", {
        duration: 3000,
        icon: "🎉",
        position: "top-center",
      });
      reset();
      navigate("/");
    },
    onError: (error) => {
      toast.error("Sign in failed, please try again", {
        duration: 3000,
        icon: "❌",
        position: "top-center",
      });
    },
  });

  const signIn = (data) => {
    mutation.mutate(data);
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          backgroundImage: `url("images/world-web-search-engine.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="sm">
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
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ color: "#3f51b5", fontWeight: "bold" }}
              >
                <FaSignInAlt style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
                Sign In
              </Typography>
              <form onSubmit={handleSubmit(signIn)}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Email is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Email"
                      variant="outlined"
                      error={!!error}
                      helperText={error?.message}
                      InputProps={{
                        startAdornment: (
                          <FaEnvelope style={{ marginRight: "0.5rem", color: "#757575" }} />
                        ),
                      }}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Password is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="Password"
                      type="password"
                      variant="outlined"
                      error={!!error}
                      helperText={error?.message}
                      InputProps={{
                        startAdornment: (
                          <FaLock style={{ marginRight: "0.5rem", color: "#757575" }} />
                        ),
                      }}
                    />
                  )}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 2, mb: 2 }}
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
              <Typography variant="body2" align="center">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{ color: "#3f51b5", textDecoration: "none", fontWeight: "bold" }}
                >
                  <FaUserPlus style={{ marginRight: "0.2rem", verticalAlign: "middle" }} />
                  Sign Up
                </Link>
              </Typography>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </Layout>
  );
};

export default Signin;
