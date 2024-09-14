/* eslint-disable react/prop-types */
import { BsDash, BsTrash2 } from "react-icons/bs";
import formatPrice from "../../utils/formatPrice";
import { BiPlus } from "react-icons/bi";

const ProductCard = ({ product, onIncrement, onDecrement, onRemove }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={product.image}
        alt={product.productName}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-4">
        <h2 className="text-lg capitalize font-bold">{product.productName}</h2>
        <p>
          Price: <b>{formatPrice(product.price)}</b>
        </p>
        <div className="flex justify-between items-center">
          <p>
            Quantity: <b>{product.quantity}</b>
          </p>
          <div className="flex gap-2 items-center">
            <button
              onClick={onDecrement}
              className="text-base bg-black border-none text-white btn btn-xs btn-primary"
            >
              <BsDash />
            </button>
            <button
              onClick={onIncrement}
              className="text-base  border-none  btn-primary bg-black  text-white btn btn-xs"
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
        <p className="text-lg font-bold">Total: {formatPrice(product.total)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
