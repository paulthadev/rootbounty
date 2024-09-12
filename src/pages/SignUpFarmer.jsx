import { LazyLoadImage } from "react-lazy-load-image-component";
import heroBanner from "../assets/hero-banner.png";
import { styles } from "../styles/styles";

import Header from "../components/landingpage/Header";
import Inputs from "../components/Inputs";
import { useState } from "react";

const SignUpFarmer = () => (
  <section className="relative flex flex-col h-[100vh] scrollbar-hide">
    <Header />

    <div className="relative w-full h-[screen]">
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <LazyLoadImage src={heroBanner} className="w-full h-full object-cover" />
    </div>

    <div
      className={`absolute inset-0 mt-36 items-center justify-center flex flex-col`}
    >
      <div className="flex flex-col gap-y-10">
        <div className={`${styles.maxWidth}`}>
          <Heading />
        </div>

        <RegisterSection />
      </div>
    </div>
  </section>
);

function Heading() {
  return (
    <div className="text-white">
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

    // Simple validation example (check if passwords match)
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // You can handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex flex-col bg-white p-4">
      <div className="px-4">
        <h1 className="text-black font-semibold pb-4">Create New Account</h1>

        <form onSubmit={handleSubmit} className="flex flex-col">
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
            className="bg-white my-2 border outline-none border-gray-400 w-full p-2 rounded-lg text-gray-900"
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
            className="btn btn-block bg-green-500 hover:bg-green-800 text-white my-4 text-lg border-none"
          >
            Sign Up as Farmer
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpFarmer;
