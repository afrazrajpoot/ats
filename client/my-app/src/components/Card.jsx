import React from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaChevronRight,
  FaDollarSign,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = ({ jobs }) => {
  return (
    <>
      <div className="container mx-auto py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {jobs?.data && jobs?.data?.length > 0 ? (
            jobs.data.map((job) => (
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
    </>
  );
};

export default Card;
