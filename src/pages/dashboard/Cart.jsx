import { useState } from "react";
import { BsDash } from "react-icons/bs";
import potatoe from "/potatoe.png";
import { BiPlus } from "react-icons/bi";
import formatPrice from "../../utils/formatPrice";

const Cart = () => {
  const [products, setProducts] = useState([
    {
      image: potatoe,
      productName: "Sweet Potatoe",
      price: 2000,
      quantity: 2,
      total: 4000,
    },
    {
      image: potatoe,
      productName: "Irish Potatoe",
      price: 2000,
      quantity: 2,
      total: 4000,
    },
  ]);

  // Function to handle quantity increment
  const handleIncrement = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity += 1;
    updatedProducts[index].total =
      updatedProducts[index].quantity * updatedProducts[index].price;
    setProducts(updatedProducts);
  };

  // Function to handle quantity decrement
  const handleDecrement = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1;
      updatedProducts[index].total =
        updatedProducts[index].quantity * updatedProducts[index].price;
      setProducts(updatedProducts);
    }
  };

  // Calculate total price of all items in the cart
  const calculateTotalPrice = () => {
    return products.reduce((total, product) => total + product.total, 0);
  };

  // Calculate total number of items in the cart
  const calculateTotalItems = () => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };

  return (
    <section className="py-10">
      {/* Cart Header */}
      <div className="flex justify-between items-center  px-4 lg:px-0 mb-4">
        <h1 className="text-2xl font-bold">Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 px-4 lg:px-0">
        {/* Cart Items */}
        <div className="col-span-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product, index) => {
              return (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="mt-4">
                    <h2 className="text-lg capitalize font-bold">
                      {product.productName}
                    </h2>
                    <p>
                      Price: <b>{formatPrice(product.price)}</b>
                    </p>
                    <div className="flex justify-between items-center">
                      <p>
                        Quantity: <b>{product.quantity}</b>
                      </p>
                      <div className="flex gap-2 px-2 items-center">
                        <button
                          onClick={() => handleDecrement(index)}
                          className="text-base w-1/2 bg-black text-white rounded-full btn btn-md btn-primary"
                        >
                          <BsDash />
                        </button>
                        <button
                          onClick={() => handleIncrement(index)}
                          className="text-base w-1/2 btn-primary bg-black text-white rounded-full btn btn-md "
                        >
                          <BiPlus />
                        </button>
                      </div>
                    </div>
                    <p className="text-lg font-bold">
                      Total: {formatPrice(product.total)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-2 col-span-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
            <div className="flex justify-between items-center">
              <p className="text-lg ">Total Items:</p>
              <p className="text-lg font-bold">{calculateTotalItems()}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-lg">Total Price:</p>
              <p className="text-lg font-bold">₦{calculateTotalPrice()}</p>
            </div>

            <button className="btn-block bg-green-500 hover:bg-green-800 text-white text-lg btn btn-primary btn-md my-4 rounded-2xl">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
