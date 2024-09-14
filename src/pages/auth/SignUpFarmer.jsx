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
    location: "",
    confirmPassword: "",
    tuber: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTuberChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      // Add or remove the tuber based on whether it's checked
      const updatedTubers = checked
        ? [...prevData.tuber, value] // Add the tuber if checked
        : prevData.tuber.filter((tuber) => tuber !== value); // Remove the tuber if unchecked

      return {
        ...prevData,
        tuber: updatedTubers,
      };
    });
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
      // Step 1: Register the user with Supabase Auth
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

      // Step 2: Insert buyer/farmer data into the 'farmer' table
      // eslint-disable-next-line no-unused-vars
      const { data, error: insertError } = await supabase
        .from("farmer")
        .insert([
          {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            phone: formData.phone,
            business_name: formData.businessName,
            tuber: formData.tuber,
            location: formData.location,
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
        tuber: [],
        location: "",
      });
      setIsLoading(false);
    } catch (error) {
      toast.error(`An unexpected error occurred: ${error.message}`);
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
          placeholder="Business Name/ Farm Name"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
        />

        {/* Select input for tubers */}
        <div className="px-2">
          <label className="text-black font-semibold">Tubers You Grow</label>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center">
              <input
                className="checkbox checkbox-primary checkbox-xs"
                type="checkbox"
                value="yam"
                checked={formData.tuber.includes("yam")}
                onChange={handleTuberChange}
              />
              <span className="ml-2">Yam</span>
            </label>
            <label className="flex items-center">
              <input
                className="checkbox checkbox-primary checkbox-xs"
                type="checkbox"
                value="cassava"
                checked={formData.tuber.includes("cassava")}
                onChange={handleTuberChange}
              />
              <span className="ml-2">Cassava</span>
            </label>
            <label className="flex items-center">
              <input
                className="checkbox checkbox-primary checkbox-xs"
                type="checkbox"
                value="potato"
                checked={formData.tuber.includes("potato")}
                onChange={handleTuberChange}
              />
              <span className="ml-2">Potato</span>
            </label>
            <label className="flex items-center">
              <input
                className="checkbox checkbox-primary checkbox-xs"
                type="checkbox"
                value="sweet potato"
                checked={formData.tuber.includes("sweet potato")}
                onChange={handleTuberChange}
              />
              <span className="ml-2">Sweet Potato</span>
            </label>
            <label className="flex items-center">
              <input
                className="checkbox checkbox-primary checkbox-xs"
                type="checkbox"
                value="tumeric"
                checked={formData.tuber.includes("tumeric")}
                onChange={handleTuberChange}
              />
              <span className="ml-2">Tumeric</span>
            </label>
            <label className="flex items-center">
              <input
                className="checkbox checkbox-primary checkbox-xs"
                type="checkbox"
                value="garlic"
                checked={formData.tuber.includes("garlic")}
                onChange={handleTuberChange}
              />
              <span className="ml-2">Garlic</span>
            </label>

            <label className="flex items-center">
              <input
                className="checkbox checkbox-primary checkbox-xs"
                type="checkbox"
                value="ginger"
                checked={formData.tuber.includes("ginger")}
                onChange={handleTuberChange}
              />
              <span className="ml-2">Ginger</span>
            </label>
          </div>
        </div>

        <Inputs
          type="text"
          placeholder="Farm Location / Farm Address"
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
