import heroBanner from "../../assets/hero-banner.png";
import { styles } from "../../styles/styles";
import Header from "../../components/landingpage/Header";
import Inputs from "../../components/Inputs";
import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../../utils/supabase";
import ButtonSpinner from "../../components/ButtonSpinner";

const SignUpBuyer = () => (
  <section className="relative flex flex-col">
    <Header className="z-10 relative" />

    <div className="flex flex-col">
      <div className="relative w-full h-screen">
        <div className="absolute h-screen inset-0 bg-black opacity-80"></div>
        <img src={heroBanner} className="w-full h-screen object-cover" />
      </div>

      {/* Content section with space for the header */}
      <div className="absolute inset-0 flex lg:items-center lg:flex-row gap-y-10 flex-col justify-between pt-24 lg:pt-0">
        <div className="flex lg:w-1/2 flex-col items-center">
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
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    businessName: "",
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
      setIsLoading(true);

      // Step 1: Register the user and store the password securely using Supabase Auth

      // eslint-disable-next-line no-unused-vars
      const { user, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        toast.error(`Registration failed: ${authError.message}`);

        setIsLoading(false);
        return;
      }

      // Step 2: If user is successfully created, insert buyer data into the 'buyer' table

      // eslint-disable-next-line no-unused-vars
      const { data, error: insertError } = await supabase.from("buyer").insert([
        {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          phone: formData.phone,
          business_name: formData.businessName,
        },
      ]);

      if (insertError) {
        toast.error(`Profile creation failed: ${insertError.message}`);
        setIsLoading(false);
        return;
      }

      toast.success("Account created successfully!");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        businessName: "",
        password: "",
        confirmPassword: "",
      });

      setIsLoading(false);
    } catch (error) {
      toast.error(
        `An unexpected error occurred. Please try again., ${error.message}`
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white p-8 md:p-12">
      <h1 className="text-black lg:text-3xl font-semibold pb-4 text-xl">
        Create New Account
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
          type="text"
          placeholder="Business Name"
          name="businessName"
          value={formData.businessName}
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
          {isLoading ? <ButtonSpinner /> : "Create Farmer Account"}
        </button>
      </form>
    </div>
  );
}

export default SignUpBuyer;
