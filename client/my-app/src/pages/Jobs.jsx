import React from "react";
import Layout from "../components/Layout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiUrl } from "../libs/config";
import Loader from "../components/Loader";
import { useAuth } from "../providers/AuthProvider";
import Card from "../components/Card";

import { FaSearch } from "react-icons/fa";

const Jobs = () => {
  const { loginUser } = useAuth();

  const fetchJobs = async () => {
    const response = await axios.get(`${apiUrl}/get-recruiterJobs`, {
      headers: {
        Authorization: `Bearer ${loginUser?.token}`,
      },
    });
    return response.data;
  };

  const {
    data: jobs,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <Loader className="w-16 h-16 text-indigo-600" />
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4 rounded-r-lg shadow-md"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>Error fetching jobs: {error.message}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div
        className="relative bg-cover bg-center py-32  bg-indigo-600  hover:to-indigo-700"
        // style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                Discover Your <span className="text-yellow-400">Jobs</span>
              </h1>
              <p className="text-2xl text-white mb-12 max-w-xl leading-relaxed">
                Explore our curated list of exciting opportunities and take the next step towards
                your professional success.
              </p>
            </div>
            <div className="self-center">
              <div className="relative max-w-md ml-auto">
                <input
                  type="text"
                  placeholder="Search for jobs..."
                  className="w-full py-5 px-8 rounded-full text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-2xl transition-all duration-300 bg-white bg-opacity-80 placeholder-gray-600"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-md">
                  <FaSearch className="inline-block mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card jobs={jobs} />
    </Layout>
  );
};

export default Jobs;
