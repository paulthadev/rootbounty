import { LazyLoadImage } from "react-lazy-load-image-component";
import heroBanner from "../assets/hero-banner.png";
import logo from "../assets/logo.png";
import { styles } from "../styles/styles";
import Header from "../components/landingpage/Header";
import Inputs from "../components/Inputs";
import { useState } from "react";

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
      <div className="absolute inset-0 flex lg:items-center  md:flex-row gap-y-10 flex-col justify-between pt-24 md:pt-0">
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
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
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

    console.log("Form submitted:", formData);
    setFormData("");
  };

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

        <button
          type="submit"
          className="md:col-span-2 bg-green-500 hover:bg-green-800 text-white py-3 rounded-lg text-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
