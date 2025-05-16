/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import { useEffect, useState } from "react";
import EmailVerificationNotice from "../components/EmailVerificationNotice";
import PendingProfileNotice from "../components/PendingProfileNotice";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading, isEmailVerified, pendingProfile, refreshUser } =
    useCurrentUser();
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  // Effect to periodically check if email has been verified
  useEffect(() => {
    if (user && !isEmailVerified) {
      setShowVerificationMessage(true);

      // Set up an interval to refresh the user data
      const intervalId = setInterval(() => {
        refreshUser();
      }, 10000); // Check every 10 seconds

      return () => clearInterval(intervalId);
    } else {
      setShowVerificationMessage(false);
    }
  }, [user, isEmailVerified, refreshUser]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is logged in, but needs to verify their email
  if (showVerificationMessage) {
    return (
      <>
        <EmailVerificationNotice email={user.email} />
        {children}
      </>
    );
  }

  // User is logged in but has a pending profile (needs DB record creation)
  if (pendingProfile) {
    return (
      <>
        <PendingProfileNotice />
        {children}
      </>
    );
  }

  // User is logged in and verified
  return children;
};

export default ProtectedRoute;
