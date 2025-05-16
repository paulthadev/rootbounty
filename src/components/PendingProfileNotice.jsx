import { useState } from "react";
import { createUserProfileIfNeeded } from "../utils/createUserProfile";
import toast from "react-hot-toast";

const PendingProfileNotice = () => {
  const [loading, setLoading] = useState(false);

  const handleCreateProfile = async () => {
    setLoading(true);
    try {
      const result = await createUserProfileIfNeeded();
      if (result.success) {
        if (result.profileCreated) {
          // Profile was created
          window.location.reload(); // Refresh the page to update UI
        } else {
          // Profile already existed
          toast.info("Your profile is already set up!");
          window.location.reload();
        }
      } else {
        toast.error(
          `Failed to create profile: ${
            result.error?.message || "Unknown error"
          }`
        );
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.error("Error creating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {/* Information icon */}
          <svg
            className="h-5 w-5 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>Your account is partially set up.</strong> Your email has
            been verified, but your profile needs to be created.
          </p>
          <div className="mt-4">
            <button
              type="button"
              onClick={handleCreateProfile}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Creating profile...
                </>
              ) : (
                "Create my profile now"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingProfileNotice;
