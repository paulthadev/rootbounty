/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CgClose, CgMail } from "react-icons/cg";
import { supabase } from "../../utils/supabase";
import { IoCall } from "react-icons/io5";
import toast from "react-hot-toast";

const ContactFarmerModal = ({ product, closeModal }) => {
  const { farmer_id } = product;
  const [farmer, setFarmer] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { business_name, location, email, tuber, phone } = farmer;

  useEffect(() => {
    const dialog = document.getElementById("contactFarmerModal");
    if (dialog) {
      dialog.showModal(); // Automatically show the modal when component renders
    }

    return () => {
      if (dialog) {
        dialog.close(); // Clean up and close the modal when component unmounts
      }
    };
  }, []);

  const fetchFarmer = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("farmer")
        .select("*")
        .eq("farmer_id", farmer_id)
        .single();

      if (error) throw error;

      setFarmer(data);
    } catch (error) {
      toast.error(`Error fetching farmer: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmer();
  }, []);

  return (
    <dialog id="contactFarmerModal" className="modal">
      <div className="modal-box relative py-10">
        {isLoading ? (
          <div className="grid place-items-center">
            <div className="loading loading-spinner bg-gray-700"></div>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-2xl text-center">
              Contact {business_name}
            </h3>
            <p className="text-center text-gray-500 capitalize">{location}</p>

            <div className="mt-4 flex items-center justify-center gap-2">
              <div
                className="flex gap-2 px-2 py-0.5 border border-gray-800 rounded-lg items-center cursor-pointer"
                onClick={() => (window.location.href = `tel:${phone}`)}
              >
                <IoCall className="text-xl" />
                {phone}
              </div>

              <div
                className="flex gap-2 px-2 py-0.5 border border-gray-800 rounded-lg items-center cursor-pointer"
                onClick={() => (window.location.href = `mailto:${email}`)}
              >
                <CgMail className="text-xl" />
                {email}
              </div>
            </div>

            <p className="text-center text-gray-500 text-xs my-2 lowercase">
              {business_name} grows {tuber?.join(", ")}.
            </p>

            <div className="modal-action absolute right-5 -top-3 cursor-pointer">
              <CgClose
                className="text-2xl hover:text-red-700"
                onClick={closeModal}
              />
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default ContactFarmerModal;
