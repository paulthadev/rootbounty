/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { BiPhone } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import Inputs from "../Inputs";

const ContactFarmerModal = ({ product, closeModal }) => {
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

  console.log(product);

  return (
    <dialog id="contactFarmerModal" className="modal">
      <div className="modal-box relative">
        <h3 className="font-bold text-lg">Contact Abuja Farms</h3>

        <div className="mt-4 flex items-center gap-4 ">
          <BiPhone />
          <span className="p-2 border border-gray-800 rounded-lg">
            07066653871
          </span>
        </div>
        <div className="modal-action absolute right-5 -top-3 cursor-pointer">
          <CgClose
            className="text-2xl hover:text-red-700 "
            onClick={closeModal}
          />
        </div>
      </div>
    </dialog>
  );
};

export default ContactFarmerModal;
