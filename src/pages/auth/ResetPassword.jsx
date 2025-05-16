import { LazyLoadImage } from "react-lazy-load-image-component";
import heroBanner from "../../assets/hero-banner.png";
import logo from "../../assets/logo.png";
import { styles } from "../../styles/styles";
import Header from "../../components/landingpage/Header";
import Inputs from "../../components/Inputs";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router";
import ButtonSpinner from "../../components/ButtonSpinner";
import { Link } from "react-router-dom";

const ResetPassword = () => (
  <section className="relative flex flex-col">
    <Header className="z-10 relative" />

    <div className="flex flex-col">
      <div className="relative w-full h-screen">
        <div className="absolute h-screen inset-0 bg-black opacity-80"></div>
        <LazyLoadImage
          src={heroBanner}
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Content section with space for the header */}
      <div className="absolute inset-0 flex lg:items-center md:flex-row gap-y-10 flex-col justify-between pt-24 md:pt-0">
        <div className="flex md:w-1/2 flex-col items-center justify-center">
          <div className={`${styles.maxWidth}`}>
            <Heading />
          </div>
        </div>

        <div className="md:w-1/2 w-full flex justify-center flex-col lg:self-stretch bg-white">
          <NewPasswordSection />
        </div>
      </div>
    </div>
  </section>
);

function Heading() {
  return (
    <div className="text-white w-full">
      <h1 className="text-3xl font-bold max-w-sm mb-4 lg:text-5xl lg:leading-tight">
        Set New Password
      </h1>

      <p className="text-xl leading-tight lg:text-2xl">
        Create a strong, secure password for your account.
      </p>
    </div>
  );
}

function NewPasswordSection() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check if user is authenticated with a recovery session
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (data?.session) {
          setSession(data.session);
        } else {
          toast.error("No active session. Please request a new reset link.");
          navigate("/forgot-password");
        }
      } catch (error) {
        console.error("Session error:", error.message);
        toast.error(`Error: ${error.message}`);
        navigate("/forgot-password");
      }
    };

    checkSession();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      setIsLoading(true);

      // Update the user's password using the active session
      const { error } = await supabase.auth.updateUser({
        password: formData.password,
      });

      if (error) throw error;

      setFormData({ password: "", confirmPassword: "" });
      toast.success("Password updated successfully!");

      // Sign out the user after password is changed
      await supabase.auth.signOut();

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.log("Error updating password:", error.message);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white p-8 md:p-12 ">
      <div className="place-items-center grid">
        <img src={logo} alt="logo" className="lg:h-60 h-40 w-40 object-cover" />

        <h1 className="text-black lg:text-3xl font-semibold pb-4 text-xl text-center">
          Create New Password
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-1 gap-2 lg:flex lg:flex-col"
      >
        <Inputs
          type="password"
          placeholder="New Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Inputs
          type="password"
          placeholder="Confirm New Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={!session}
          className="md:col-span-2 bg-green-500 hover:bg-green-800 text-white py-3 rounded-lg text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? <ButtonSpinner /> : "Update Password"}
        </button>
      </form>
      <p className="text-center pt-4">
        <Link to="/login" className="font-semibold">
          Back to Login
        </Link>
      </p>
    </div>
  );
}

export default ResetPassword;
