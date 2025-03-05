import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Menu, Globe2, Bell } from "lucide-react";
import HemisLogo from "./components/HemisLogo";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import StudyPlan from "./pages/StudyPlan";

import CreateFaculty from "./pages/Faculty/CreateFaculty.jsx";
import ListFaculty from "./pages/Faculty/ListFaculty.jsx";
import UpdateFaculty from "./pages/Faculty/UpdateFaculty.jsx";
import CreateDepartment from "./pages/Department/CreateDepartment.jsx";
import ListDepartment from "./pages/Department/ListDepartment.jsx";
import LoginPage from "./pages/LoginPage.jsx";
function ProtectedRoute({ children }) {
  const token = JSON.parse(localStorage.getItem("token"));
  const location = useLocation();

  if (!token) {
    // Agar token mavjud bo'lmasa, login sahifasiga yo'naltirish
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation(); // Get current route location
  const isLoginPage = location.pathname === "/login";
  const token = JSON.parse(localStorage.getItem("token"));
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      {!isLoginPage && (
        <header className="bg-[#2557A7] text-white fixed w-full z-10">
          <div className="px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Menu
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <HemisLogo className="h-8" />
              </div>
              <div className="flex items-center space-x-6">
                {/* <Globe2 className="h-5 w-5 cursor-pointer" /> */}
                <Bell className="h-5 w-5 cursor-pointer" />
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm font-medium">JS</span>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium">John Smith</div>
                    <div className="text-xs text-gray-300">Student</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      <div className={`flex ${!isLoginPage ? "pt-16" : ""}`}>
        {/* Show sidebar only when not on login page */}
        {!isLoginPage && <Sidebar isOpen={isSidebarOpen} />}

        <main
          className={`flex-1 p-6 transition-all duration-300 ${
            !isLoginPage && isSidebarOpen
              ? "ml-64"
              : !isLoginPage
              ? "ml-20"
              : ""
          }`}
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/study-plan"
              element={
                <ProtectedRoute>
                  <StudyPlan />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-faculty"
              element={
                <ProtectedRoute>
                  <CreateFaculty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/list-faculty"
              element={
                <ProtectedRoute>
                  <ListFaculty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-faculty/:facultyId"
              element={
                <ProtectedRoute>
                  <UpdateFaculty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-department"
              element={
                <ProtectedRoute>
                  <CreateDepartment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/list-department"
              element={
                <ProtectedRoute>
                  <ListDepartment />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
