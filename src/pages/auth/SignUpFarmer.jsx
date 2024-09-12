import { LazyLoadImage } from "react-lazy-load-image-component";
import heroBanner from "../../assets/hero-banner.png";
import { styles } from "../../styles/styles";
import Header from "../../components/landingpage/Header";
import Inputs from "../../components/Inputs";
import { useState } from "react";

const SignUpFarmer = () => (
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
      <h1 className="text-3xl font-bold max-w-sm mb-4 lg:text-5xl lg:leading-tight">
        Welcome, <br />
        Let&apos;s Get You Started
      </h1>

      <p className="text-xl leading-tight lg:text-2xl">
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
    setFormData("");
  };

  return (
    <div className="w-full bg-white p-8 md:p-12 ">
      <h1 className="text-black  lg:text-3xl font-semibold pb-4 text-xl">
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
          className="select bg-white border outline-none border-gray-400 w-full px-2 focus:border-gray-400 rounded-lg text-gray-900"
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
