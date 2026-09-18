import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ================= MAIN PAGES =================
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// ================= STUDENT PAGES =================
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import Skills from "./pages/student/Skills";
import SkillTest from "./pages/student/SkillTest";
import Projects from "./pages/student/Projects";
import Notifications from "./pages/student/Notifications";
import ProjectDetails from "./pages/student/ProjectDetailsTemp";
import Applications from "./pages/student/Applications";
import ApplicationDetails from "./pages/student/ApplicationDetails";
import MyWork from "./pages/student/MyWork";
import Portfolio from "./pages/student/Portfolio";
import Messages from "./pages/student/Messages";
import Reviews from "./pages/student/Reviews";
import AIMatch from "./pages/student/AIMatch";

// ================= CLIENT PAGES =================
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientProfile from "./pages/client/ClientProfile";
import PostProject from "./pages/client/PostProject";
import MyProjects from "./pages/client/MyProjects";
import FindStudents from "./pages/client/FindStudents";
import Proposals from "./pages/client/Proposals";
import ClientMessages from "./pages/client/ClientMessages";
import ClientReviews from "./pages/client/ClientReviews";


// ================= LAYOUT =================
function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}


// ================= APP =================
function App() {
  return (
    <Routes>

      {/* ================= HOME ================= */}

      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />


      {/* ================= AUTH ================= */}

      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />

      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />


      {/* ================= STUDENT ================= */}

      <Route
        path="/student/dashboard"
        element={
          <Layout>
            <StudentDashboard />
          </Layout>
        }
      />

      <Route
        path="/student/profile"
        element={
          <Layout>
            <StudentProfile />
          </Layout>
        }
      />

      <Route
        path="/student/skills"
        element={
          <Layout>
            <Skills />
          </Layout>
        }
      />

      <Route
        path="/student/skill-test"
        element={
          <Layout>
            <SkillTest />
          </Layout>
        }
      />

      {/* Student Projects */}

      <Route
        path="/student/projects"
        element={
          <Layout>
            <Projects />
          </Layout>
        }
      />

      <Route
        path="/student/projects/view/:title"
        element={
          <Layout>
            <ProjectDetails />
          </Layout>
        }
      />

      {/* Student Applications */}

      <Route
        path="/student/applications"
        element={
          <Layout>
            <Applications />
          </Layout>
        }
      />

      <Route
        path="/student/applications/view/:id"
        element={
          <Layout>
            <ApplicationDetails />
          </Layout>
        }
      />

      {/* Student Work */}

      <Route
        path="/student/work"
        element={
          <Layout>
            <MyWork />
          </Layout>
        }
      />

      {/* Student Portfolio */}

      <Route
        path="/student/portfolio"
        element={
          <Layout>
            <Portfolio />
          </Layout>
        }
      />

      {/* Student Messages */}

      <Route
        path="/student/messages"
        element={
          <Layout>
            <Messages />
          </Layout>
        }
      />

      {/* Student Reviews */}

      <Route
        path="/student/reviews"
        element={
          <Layout>
            <Reviews />
          </Layout>
        }
      />

      {/* Student AI Match */}

      <Route
        path="/student/ai-match"
        element={
          <Layout>
            <AIMatch />
          </Layout>
        }
      />
      <Route
  path="/student/notifications"
  element={<Notifications />}
/>


      {/* ================= CLIENT ================= */}

      <Route
        path="/client/dashboard"
        element={
          <Layout>
            <ClientDashboard />
          </Layout>
        }
      />

      <Route
        path="/client/post-project"
        element={
          <Layout>
            <PostProject />
          </Layout>
        }
      />

      <Route
        path="/client/projects"
        element={
          <Layout>
            <MyProjects />
          </Layout>
        }
      />

      <Route
        path="/client/students"
        element={
          <Layout>
            <FindStudents />
          </Layout>
        }
      />

      <Route
        path="/client/proposals"
        element={
          <Layout>
            <Proposals />
          </Layout>
        }
      />

      <Route
        path="/client/profile"
        element={
          <Layout>
            <ClientProfile />
          </Layout>
        }
      />

      <Route
        path="/client/messages"
        element={
          <Layout>
            <ClientMessages />
          </Layout>
        }
      />

      <Route
        path="/client/reviews"
        element={
          <Layout>
            <ClientReviews />
          </Layout>
        }
      />

    </Routes>
  );
}

export default App;