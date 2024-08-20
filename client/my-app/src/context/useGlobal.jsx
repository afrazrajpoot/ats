import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useGlobalContext = () => useContext(UserContext);

export const GlobalProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState("");
  const [resumeData, setResumeData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    mobileNumber: "",
    email: "",
    location: "",
    description: "",
    experienceDesignation: "",
    organization: "",
    experienceLocation: "",
    workDescription: "",
    courseName: "",
    board: "",
    uniName: "",
    educationType: "",
    endYear: "",
    skills: [],
  });

  return (
    <UserContext.Provider value={{ profileImage, setProfileImage, resumeData, setResumeData }}>
      {children}
    </UserContext.Provider>
  );
};
