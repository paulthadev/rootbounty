import { LazyLoadImage } from "react-lazy-load-image-component";
import heroBanner from "../assets/hero-banner.png";
import { styles } from "../styles/styles";

import Header from "../components/landingpage/Header";
import Inputs from "../components/Inputs";
import { useState } from "react";

const SignUpFarmer = () => (
  <section className="relative flex flex-col h-[90vh]scrollbar-hide">
    {/* Set z-index and padding to avoid overlap */}
    <Header className="z-10 relative" />

    <div className="flex flex-col">
      <div className="relative w-full h-screen">
        {/* Background image and overlay */}
        <div className="absolute h-screen inset-0 bg-black opacity-80"></div>
        <LazyLoadImage
          src={heroBanner}
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Content section with space for the header */}
      <div className="absolute inset-0 flex gap-y-10 flex-col justify-between pt-24">
        {/* Heading centered */}
        <div className="flex flex-col items-center ">
          <div className={`${styles.maxWidth}`}>
            <Heading />
          </div>
        </div>

        {/* Register Section pushed to the bottom */}
        <div className="w-full">
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
        Let&apos;s Get You Started
      </h1>

      <p className="text-xl leading-tight">
        Join our platform and start selling your high quality tuber crops.
      </p>
    </div>
  );
}

function RegisterSection() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    location: "",
    email: "",
    phone: "",
    tuber: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form submitted:", formData);
  };

  return (
    <div className="w-full bg-white p-8 md:p-12">
      <h1 className="text-black font-semibold pb-4 text-xl">
        Create New Account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-2"
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
          placeholder="Location"
          name="location"
          value={formData.location}
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

        <select
          name="tuber"
          className="bg-white border outline-none border-gray-400 w-full p-2 rounded-lg text-gray-900"
          value={formData.tuber}
          onChange={handleChange}
        >
          <option value="">Tubers you grow</option>
          <option value="yam">Yam</option>
          <option value="potatoes">Potatoes</option>
        </select>

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
          Sign Up as Farmer
        </button>
      </form>
    </div>
  );
}

export default SignUpFarmer;
