import React from "react";
import { useGlobalContext } from "../context/useGlobal";
import { Card, CardContent, Typography, Box, Avatar, Divider } from "@mui/material";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
} from "react-icons/fa";

const CvTemplate = () => {
  const { profileImage, resumeData } = useGlobalContext();

  return (
    <main className="mt-6 p-6 flex bg-gray-100">
      {/* Sidebar */}
      <Box className="w-full max-w-[18vw] bg-white rounded-lg p-5 mr-6 shadow-lg">
        <Avatar
          alt={resumeData.firstName}
          src={profileImage}
          sx={{ width: 160, height: 160 }}
          className="mx-auto mb-5 border-4 border-gray-200"
        />
        <Typography variant="h5" className="font-bold text-center mb-4 text-gray-800">
          {resumeData.firstName} {resumeData.lastName}
        </Typography>
        <Divider className="mb-4" />
        <Box className="space-y-3">
          <Typography variant="body1" className="text-[1vw] flex items-center">
            <FaEnvelope className="mr-2 text-gray-600" /> {resumeData.email}
          </Typography>
          <Typography variant="body1" className="text-[1vw] flex items-center">
            <FaPhone className="mr-2 text-gray-600" /> {resumeData.mobileNumber}
          </Typography>
          <Typography variant="body1" className="text-[1vw] flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gray-600" /> {resumeData.location}
          </Typography>
        </Box>
        <Divider className="my-4" />
        <Typography variant="body2" className="text-[0.9vw] text-gray-600">
          {resumeData.description}
        </Typography>
      </Box>

      {/* Main Content */}
      <Box className="flex-grow space-y-6">
        {/* Work Experience Section */}
        <Card className="rounded-lg shadow-md overflow-hidden">
          <CardContent className="bg-gray-800 text-white p-3">
            <Typography variant="h6" className="font-bold flex items-center">
              <FaBriefcase className="mr-2" /> Work Experience
            </Typography>
          </CardContent>
          <CardContent className="p-4">
            <Box className="space-y-2">
              <Typography variant="h6" className="text-[1.2vw] font-semibold">
                {resumeData.designation}
              </Typography>
              <Typography variant="body1" className="text-[1vw] text-gray-600">
                {resumeData.organization}, {resumeData.experienceLocation}
              </Typography>
              <Typography variant="body2" className="text-[0.9vw]">
                {resumeData.workDescription}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card className="rounded-lg shadow-md overflow-hidden">
          <CardContent className="bg-gray-800 text-white p-3">
            <Typography variant="h6" className="font-bold flex items-center">
              <FaGraduationCap className="mr-2" /> Education
            </Typography>
          </CardContent>
          <CardContent className="p-4">
            <Box className="space-y-2">
              <Typography variant="h6" className="text-[1.2vw] font-semibold">
                {resumeData.courseName}
              </Typography>
              <Typography variant="body2" className="text-[0.9vw]">
                <strong>Specialization / Board:</strong> {resumeData.board}
              </Typography>
              <Typography variant="body2" className="text-[0.9vw]">
                <strong>University:</strong> {resumeData.uniName}
              </Typography>
              <Typography variant="body2" className="text-[0.9vw]">
                <strong>Education Type:</strong> {resumeData.educationType}
              </Typography>
              <Typography variant="body2" className="text-[0.9vw]">
                <strong>Year of Passing:</strong> {resumeData.endYear}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="rounded-lg shadow-md overflow-hidden">
          <CardContent className="bg-gray-800 text-white p-3">
            <Typography variant="h6" className="font-bold flex items-center">
              <FaTools className="mr-2" /> Skills
            </Typography>
          </CardContent>
          <CardContent className="p-4">
            <Box className="flex flex-wrap gap-2">
              {resumeData?.skills.map((skill, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-[0.8vw]"
                >
                  {skill}
                </Typography>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </main>
  );
};

export default CvTemplate;
