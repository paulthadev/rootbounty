/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useCurrentUser from "../hooks/useCurrentUser";

const AuthCheck = ({ children }) => {
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // If user is logged in, redirect to profile
      navigate("/profile");
    }
  }, [user, navigate]);

  return user ? null : children; // If the user is logged in, render nothing, else render the child component
};

export default AuthCheck;
