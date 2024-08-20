import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { motion } from "framer-motion";
const Header = () => {
  const { loginUser, logout } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    // Implement your logout logic here
    logout();
    navigate("/");
    // console.log("Logout clicked");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".relative")) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <header>
        <div className="container ">
          <div className="logo">
            <Link to="/">
              <img src="images/logo.png" alt="Logo" />
            </Link>
          </div>
          <nav className="left-nav">
            <Link to="/signin">Candidate</Link>
            <Link to="/recruiter-signup">Recruiter</Link>
          </nav>
          {loginUser ? (
            <div className="relative">
              <Avatar onClick={togglePopup}>
                <img src={loginUser?.img} alt="img" />
              </Avatar>
              <p>{loginUser?.firstName || loginUser?.username}</p>
              {showPopup && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={0.5}
                  className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2"
                >
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setShowPopup(false)}
                  >
                    <PersonIcon className="mr-2" /> Profile
                  </Link>
                  <button
                    className="flex items-center w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => {
                      setShowPopup(false);

                      handleLogout();
                    }}
                  >
                    <LogoutIcon className="mr-2" /> Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="dropdown">
              <button className="dropbtn">
                Sign in <span>▾</span>
              </button>
              <div className="dropdown-content">
                <Link to="/signin">Candidate Sign In</Link>
                <Link to="/signin">Recruiter Sign In</Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
