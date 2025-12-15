import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context.jsx";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setIsPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLoggedIn = user && user.name;

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center relative">
      <h1
        className="font-semibold text-lg sm:text-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        Task Management System
      </h1>

      {isLoggedIn ? (
        <div className="relative" ref={popupRef}>
          {/* Avatar */}
          <div
            onClick={() => setIsPopupOpen((prev) => !prev)}
            className="h-10 w-10 rounded-full bg-blue-500 cursor-pointer flex justify-center items-center font-semibold"
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          {isPopupOpen && (
            <div
              ref={popupRef}
              className="
                fixed
                top-16
                right-4
                w-48
                bg-white
                text-black
                shadow-lg
                rounded-lg
                py-2
                z-50
                sm:absolute
                sm:top-14
                sm:right-0
              "
            >
              {/* ADMIN DASHBOARD */}
              {user.role === "ADMIN" && (
                <button
                  onClick={() => {
                    navigate("/admin");
                    setIsPopupOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </button>
              )}

              <button
                onClick={() => {
                  navigate("/update-password");
                  setIsPopupOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Update Password
              </button>

              <button
                onClick={async () => {
                  await logout();
                  setIsPopupOpen(false);
                  navigate("/"); // 🔥 redirect
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
        >
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
