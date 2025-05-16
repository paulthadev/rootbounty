/* eslint-disable react/prop-types */
import { useState } from "react";
import { supabase } from "../utils/supabase";
import toast from "react-hot-toast";

const EmailVerificationNotice = ({ email }) => {
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    if (!email) return;

    try {
      setIsResending(true);
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });

      if (error) throw error;

      toast.success("Verification email resent! Please check your inbox.");
    } catch (error) {
      console.error("Error resending verification email:", error);
      toast.error(`Failed to resend: ${error.message}`);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">
            Email Verification Required
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>
              We&apos;ve sent a verification email to <strong>{email}</strong>.
              Please check your inbox and click the link to verify your email
              address.
            </p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500 font-medium flex items-center disabled:opacity-50"
              onClick={handleResendEmail}
              disabled={isResending}
            >
              {isResending ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Resending...
                </>
              ) : (
                <>
                  <svg
                    className="-ml-0.5 mr-1 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Resend verification email
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationNotice;
