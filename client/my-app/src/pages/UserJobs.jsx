import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { apiUrl } from "../libs/config";
import axios from "axios";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { useAuth } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaChevronRight,
  FaDollarSign,
  FaMapMarkerAlt,
  FaSearch,
} from "react-icons/fa";

const UserJobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const baseUrl = apiUrl;
  const { loginUser } = useAuth();

  const {
    data: jobs,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["userJobs"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/get-jobs`, {
        headers: {
          Authorization: `Bearer ${loginUser?.token}`,
        },
      });
      return response.data; // Use response.data directly
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 10, // 10 minutes
  });

  const filteredJobs = jobs?.jobs?.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <p className="text-red-600 text-center mt-[9vw]">Error fetching jobs</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="">
        <div
          className="relative bg-cover bg-center py-32  bg-indigo-600  hover:to-indigo-700"
          // style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h1 className="text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                  Discover Your <span className="text-yellow-400">Dream Career</span>
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
        <div className="container mx-auto py-20 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredJobs && filteredJobs?.length > 0 ? (
              filteredJobs?.map((job) => (
                <Link to={`/get-job/${job._id}`} key={job._id} className="group">
                  <div className="job-item bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 transform hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-bl-2xl text-sm font-semibold shadow-lg">
                      New
                    </div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {job.title}
                      </h3>
                      <span className="text-sm text-gray-500 flex items-center bg-gray-100 px-3 py-1 rounded-full shadow-inner">
                        <FaCalendarAlt className="mr-2" />
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-lg text-gray-700 mb-4 flex items-center">
                      <FaBriefcase className="mr-3 text-blue-500" />
                      {job.company}
                    </p>
                    <p className="text-lg text-gray-700 mb-4 flex items-center">
                      <FaMapMarkerAlt className="mr-3 text-green-500" />
                      {job.location}
                    </p>
                    <p className="text-lg text-gray-700 mb-6 flex items-center">
                      <FaDollarSign className="mr-3 text-yellow-500" />
                      {job.salary.toLocaleString()}
                    </p>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {job.description.slice(0, 120)}
                      {job.description.length > 120 ? "..." : ""}
                    </p>
                    <div className="flex justify-between items-center">
                      <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center">
                        View Details
                        <FaChevronRight className="ml-2" />
                      </button>
                      {job.applications && job.applications.length > 0 && (
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full shadow-inner">
                          {job.applications.length} application
                          {job.applications.length > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    {job.applications && job.applications.length > 0 && (
                      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 shadow-md">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">
                          Recent Applications
                        </h4>
                        <ul className="space-y-3">
                          {job.applications.slice(0, 2).map((application, index) => (
                            <li
                              key={index}
                              className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm transition-shadow hover:shadow-md"
                            >
                              <span className="font-medium">{application.name}</span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  application.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : application.status === "Accepted"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {application.status}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {job.applications.length > 2 && (
                          <p className="text-sm text-gray-600 mt-3 italic text-center">
                            {job.applications.length - 2} more application
                            {job.applications.length - 2 > 1 ? "s" : ""}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full text-xl">
                No jobs available at the moment
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserJobs;
