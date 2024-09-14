/* eslint-disable react/prop-types */
import { useEffect } from "react";

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

  return (
    <dialog id="contactFarmerModal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Contact Farmer</h3>
        <p className="py-4">
          Send a message to the farmer regarding {product.productName}.
        </p>
        <div className="modal-action">
          <button className="btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ContactFarmerModal;
