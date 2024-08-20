import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "react-image-crop/dist/ReactCrop.css";
import "./App.css";
import Comments from "./pages/Comment";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import JobPost from "./pages/JobPost";
import Jobs from "./pages/Jobs";
import GetJobById from "./dynamicPages/GetJobById";
import JobApply from "./pages/JobApply"; // Ensure this import path is correct
import UserJobs from "./pages/UserJobs"; // Ensure this import path is correct
import Account from "./pages/Account";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const RecruiterSignup = lazy(() => import("./pages/RecruiterSignup"));
const CreateResume = lazy(() => import("./pages/CreateResume"));

// Main App component
function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/recruiter-signup" element={<RecruiterSignup />} />
        <Route path="/create-resume" element={<CreateResume />} />
        <Route path="/comment" element={<Comments />} />
        <Route path="/job-apply/:id" element={<JobApply />} />
        <Route path="/job-post" element={<JobPost />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/get-job/:id" element={<GetJobById />} />
        <Route path="/user-jobs" element={<UserJobs />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Suspense>
  );
}

export default App;
