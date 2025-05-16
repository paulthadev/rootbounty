import { LazyLoadImage } from "react-lazy-load-image-component";
import heroBanner from "../../assets/hero-banner.png";
import logo from "../../assets/logo.png";
import { styles } from "../../styles/styles";
import Header from "../../components/landingpage/Header";
import Inputs from "../../components/Inputs";
import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router";
import ButtonSpinner from "../../components/ButtonSpinner";
import { Link } from "react-router-dom";
import { createUserProfileIfNeeded } from "../../utils/createUserProfile";
import EmailVerificationNotice from "../../components/EmailVerificationNotice";

const LoginPage = () => (
  <section className="relative flex flex-col ">
    <Header className="z-10 relative" />

    <div className="flex flex-col  ">
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
          <RegisterSection />
        </div>
      </div>
    </div>
  </section>
);

function Heading() {
  return (
    <div className="text-white w-full">
      <h1 className="text-3xl font-bold max-w-sm mb-4 lg:text-5xl lg:leading-tight">
        Welcome, <br />
        Let&apos;s Get You Ready to Shop
      </h1>

      <p className="text-xl leading-tight lg:text-2xl">
        Join our community and start purchasing fresh tuber crops directly from
        trusted farmers.
      </p>
    </div>
  );
}

function RegisterSection() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [unverifiedEmail, setUnverifiedEmail] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      // Log in using Supabase authentication
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        // Check if this is an "Email not confirmed" error
        if (
          error.message === "Email not confirmed" ||
          (error.message.includes("email") && error.message.includes("confirm"))
        ) {
          // Handle unverified email case
          setUnverifiedEmail(formData.email);
          toast.error("Please verify your email before logging in");
          setIsLoading(false);
          return;
        }
        throw error;
      }

      // Email is verified if we get here
      // Check if user needs profile creation (after email verification)
      const profileResult = await createUserProfileIfNeeded();
      if (!profileResult.success) {
        console.warn(
          "Profile check/creation encountered an issue:",
          profileResult.error
        );
      }

      setFormData({ email: "", password: "" });
      toast.success("Login successful!");
      setIsLoading(false);

      // Redirect to the profile page
      navigate("/profile");
    } catch (error) {
      console.log("Error logging in:", error.message);
      toast.error(`Error logging in: ${error.message}`);
      setIsLoading(false);
    }
  };

  // Show email verification notice if login attempt was with unverified email
  if (unverifiedEmail) {
    return (
      <div className="w-full bg-white p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Email Not Verified</h1>
          <p className="text-gray-600">
            Please verify your email address before logging in.
          </p>
        </div>

        <EmailVerificationNotice email={unverifiedEmail} />

        <div className="text-center mt-8">
          <button
            onClick={() => setUnverifiedEmail(null)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-8 md:p-12 ">
      <div className="place-items-center grid">
        <img
          src={logo}
          alt="hero banner "
          className="lg:h-60 h-40 w-40 object-cover"
        />

        <h1 className="text-black  lg:text-3xl font-semibold pb-4 text-xl text-center">
          Welcome Back <br /> Log In to Your Account
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-2 lg:flex lg:flex-col"
      >
        <Inputs
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Inputs
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="md:col-span-2 text-right mb-2">
          <Link
            to="/forgot-password"
            className="text-green-600 hover:text-green-800 text-sm"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="md:col-span-2 bg-green-500 hover:bg-green-800 text-white py-3 rounded-lg text-lg"
        >
          {isLoading ? <ButtonSpinner /> : "Login"}
        </button>
      </form>
      <p className="text-center pt-2 ">
        Don&apos;t have an account?{" "}
        <Link to="/onboarding" className="font-semibold">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
