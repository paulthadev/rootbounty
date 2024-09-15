/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsDash, BsTrash2 } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import formatPrice from "../../utils/formatPrice";
import ContactFarmerModal from "./ContactFarmerModal";

const ProductCard = ({ product, onIncrement, onDecrement, onRemove }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={product?.images?.[0]}
        alt={product.product_name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-4">
        <h2 className="text-lg capitalize font-bold">{product.product_name}</h2>
        <p>
          Price: <b>{formatPrice(product.price)}</b>
        </p>
        <div className="flex justify-between items-center">
          <p>
            Quantity: <b>{product.quantity}</b>
          </p>
          <div className="flex gap-1 items-center">
            <button
              onClick={onDecrement}
              className="text-base bg-black border-none text-white btn btn-xs btn-primary"
            >
              <BsDash />
            </button>
            <button
              onClick={onIncrement}
              className="text-base border-none btn-primary bg-black text-white btn btn-xs"
            >
              <BiPlus />
            </button>
            <button
              onClick={onRemove}
              className="text-base btn-primary border-none bg-red-500 text-white btn btn-xs"
            >
              <BsTrash2 />
            </button>
          </div>
        </div>

        <div className="flex justify-between my-2 gap-2">
          <p>
            Total: <b>{formatPrice(product.total)}</b>
          </p>

          {/* Contact Farmer Button */}
          <button
            onClick={handleOpenModal}
            className="btn-secondary btn btn-xs capitalize hover:bg-primary hover:text-white"
          >
            Contact Farmer
          </button>
        </div>
      </div>

      {/* Contact Farmer Modal */}
      {isModalOpen && (
        <ContactFarmerModal product={product} closeModal={handleCloseModal} />
      )}
    </div>
  );
};

export default ProductCard;
