import { LazyLoadImage } from "react-lazy-load-image-component";
import heroBanner from "../../assets/hero-banner.png";
import { styles } from "../../styles/styles";
import Header from "../../components/landingpage/Header";
import Inputs from "../../components/Inputs";
import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router";
import ButtonSpinner from "../../components/ButtonSpinner";
import { Link } from "react-router-dom";
import EmailVerificationNotice from "../../components/EmailVerificationNotice";

const SignUpBuyer = () => (
  <section className="relative flex flex-col ">
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
      <div className="absolute inset-0 flex lg:items-center  lg:flex-row gap-y-10 flex-col justify-between pt-24 lg:pt-0">
        <div className="flex lg:w-1/2 flex-col items-center ">
          <div className={`${styles.maxWidth}`}>
            <Heading />
          </div>
        </div>

        <div className="lg:w-1/2 w-full flex justify-center flex-col lg:self-stretch bg-white">
          <RegisterSection />
        </div>
      </div>
    </div>
  </section>
);

function Heading() {
  return (
    <div className="text-white w-full">
      <h1 className="text-3xl font-bold max-w-sm mb-4">
        Welcome, <br />
        Let&apos;s Get You Ready to Shop
      </h1>

      <p className="text-xl leading-tight">
        Join the platform and start purchasing fresh tuber crops directly from
        trusted farmers.
      </p>
    </div>
  );
}

function RegisterSection() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      // Register the user with Supabase Auth and store profile data in metadata
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            firstname: formData.firstname,
            lastname: formData.lastname,
            phone: formData.phone,
            user_type: "buyer",
            pending_profile: true, // Flag to indicate profile needs to be created
          },
        },
      });

      if (error) {
        console.error("Error during registration:", error.message);
        toast.error(`Registration failed: ${error.message}`);
        setIsLoading(false);
        return;
      }

      // Instead of inserting into the database now, we'll show the verification notice
      toast.success("Registration successful! Please verify your email.");
      setRegisteredEmail(formData.email);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error during registration:", error.message);
      toast.error(`An unexpected error occurred: ${error.message}`);
      setIsLoading(false);
    }
  };

  // If user just registered, show verification notice
  if (registeredEmail) {
    return (
      <div className="w-full bg-white p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Account Created!</h1>
          <p className="text-gray-600">
            Your account has been created successfully, but we need to verify
            your email.
          </p>
        </div>

        <EmailVerificationNotice email={registeredEmail} />

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-8  md:p-12 ">
      <h1 className="text-black lg:text-3xl font-semibold pb-4 text-xl">
        Create New Buyer Account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-2 lg:flex lg:flex-col"
      >
        <Inputs
          type="text"
          placeholder="First Name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />

        <Inputs
          type="text"
          placeholder="Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />

        <Inputs
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Inputs
          type="tel"
          placeholder="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <Inputs
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Inputs
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="md:col-span-2 bg-green-500 hover:bg-green-800 text-white py-3 rounded-lg text-lg"
        >
          {isLoading ? <ButtonSpinner /> : "Create Buyer Account"}
        </button>
      </form>
      <div className="p-4 border-t">
        <p className="text-center text-sm sm:text-base">
          Already has an account? click here to{" "}
          <Link to="/login">
            <span className="font-bold">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpBuyer;
