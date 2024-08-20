import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../libs/config";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { useAuth } from "../providers/AuthProvider";
import { ButtonLoader } from "../components/ButtonLoader";
import toast from "react-hot-toast";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaDollarSign,
  FaFileAlt,
  FaDownload,
  FaChevronLeft,
  FaPaperPlane,
  FaUserAlt,
  FaEnvelope,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { IoMdTime } from "react-icons/io";

const GetJobById = () => {
  const { id } = useParams();
  const baseUrl = apiUrl;
  const [specifiId, setSpecificId] = useState(null);
  const { loginUser } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${baseUrl}/checkAts`, data, {
        headers: { Authorization: `Bearer ${loginUser?.token}` },
      });
      return response.data;
    },
    onError: (err) => {
      toast.error("Resume did not match", {
        duration: 3000,
        position: "top-center",
      });
    },
    onSuccess: () => {
      toast.success("Resume matched successfully", {
        duration: 3000,
        position: "top-center",
      });
    },
  });

  function checkAts(jobId) {
    setSpecificId(jobId);
    mutation.mutate({ id, jobId });
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["jobs", id],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/get-job/${id}`, {
        headers: { Authorization: `Bearer ${loginUser?.token}` },
      });
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-red-600 text-xl">Error fetching job: {error.message}</p>
        </div>
      </Layout>
    );
  }

  const job = data?.data;
  const applications = job?.applications || [];

  return (
    <Layout>
      <main className="bg-gray-100 min-h-screen py-12 mt-[4vw]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Job Header */}
            <div className="bg-blue-600 text-white p-6">
              <h1 className="text-3xl font-bold">{job?.title}</h1>
              <div className="mt-2 flex items-center">
                <FaBuilding className="mr-2" />
                <span>{job?.company}</span>
              </div>
            </div>

            {/* Job Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <InfoCard icon={<FaMapMarkerAlt />} label="Location" value={job?.location} />
                <InfoCard icon={<FaDollarSign />} label="Salary" value={`$${job?.salary}`} />
                <InfoCard
                  icon={<FaBriefcase />}
                  label="Job Type"
                  value={job?.jobType || "Full-time"}
                />
              </div>

              {/* Job Description */}
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
                <p className="text-gray-700 leading-relaxed">{job?.description}</p>
              </div>

              {/* Applications */}
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6">Applications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {applications.map((application, index) => (
                    <ApplicationCard
                      key={index}
                      application={application}
                      checkAts={checkAts}
                      mutation={mutation}
                      specifiId={specifiId}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4">
              <button
                onClick={() => window.history.back()}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
              >
                <FaChevronLeft className="mr-2" />
                Back
              </button>

              {loginUser?.user && (
                <Link to={`/job-apply/${id}`}>
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <FaPaperPlane className="mr-2" />
                    Apply Now
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
    <div className="text-blue-500 mr-4">{icon}</div>
    <div>
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const ApplicationCard = ({ application, checkAts, mutation, specifiId }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-2xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
      Application Details
    </h3>
    <div className="space-y-4 mb-6">
      <p className="text-gray-700 flex items-center">
        <FaUserAlt className="mr-3 text-blue-600 text-xl" />
        <span className="font-medium">{application?.name}</span>
      </p>
      <p className="text-gray-700 flex items-center">
        <FaEnvelope className="mr-3 text-blue-600 text-xl" />
        <span className="font-medium">{application?.email}</span>
      </p>
      <p className="text-gray-700 flex items-center">
        <FaCheckCircle className="mr-3 text-green-500 text-xl" />
        <span className="font-medium">{application?.status}</span>
      </p>
      <p className="text-gray-700 flex items-center">
        <IoMdTime className="mr-3 text-gray-500 text-xl" />
        <span className="font-medium">
          {new Date(application?.createdAt || Date.now()).toLocaleDateString()}
        </span>
      </p>
    </div>
    <div className="flex flex-col space-y-3">
      <button
        onClick={() => checkAts(application._id)}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
      >
        {mutation.isPending && specifiId === application._id ? (
          <ButtonLoader />
        ) : (
          <>
            <MdAttachFile className="mr-2 text-lg" />
            Check Resume Match
          </>
        )}
      </button>
      <a
        href={`../../../../server/public/temp${application?.resume}`}
        download={`../../../../server/public/temp${application?.resume}`}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-center flex items-center justify-center"
      >
        <FaDownload className="mr-2 text-lg" />
        Download Resume
      </a>
    </div>
  </div>
);

export default GetJobById;
