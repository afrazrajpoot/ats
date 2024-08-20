import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageCroper from "../components/ImageCroper";
import Layout from "../components/Layout";
import { useAuth } from "../providers/AuthProvider";
// import "./assets/cssAnimation.css";
const Account = () => {
  const { loginUser } = useAuth();
  // console.log(loginUser?.data?.recruiter, "my user");
  const navigate = useNavigate();

  return (
    <Layout>
      <div id="outer-wrapper ">
        <main>
          <div className="centered-div mt-[7vw]">
            <h1>Select a role to get started</h1>
            <p>In the process we will help you personalize your experience.</p>

            <>
              {" "}
              <Link to="/signup" className="custom-link">
                <span
                  className="link-icon"
                  style={{
                    backgroundImage: 'url("./images/icon-candidate.png")',
                  }}
                />
                <h2>
                  Register as Candidate
                  <span>Create your own resume</span>
                </h2>
                <span className="right-arrow">&gt;</span>
              </Link>
              <Link to="/recruiter-signup" className="custom-link recruiter">
                <span
                  className="link-icon"
                  style={{
                    backgroundImage: 'url("./images/icon-recruiter.png")',
                  }}
                />
                <h2>
                  Register as Recruiter
                  <span className="link-text">Create resumes for various clients</span>
                </h2>
                <span className="right-arrow">&gt;</span>
              </Link>
            </>
          </div>
          <span className="page-img">
            <img src="/images/world-web-search-engine.png" />
          </span>
        </main>
      </div>
    </Layout>
  );
};

export default Account;
