import Decimal from "decimal.js";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeProduct,
} from "../../features/cartSlice";
import ProductCard from "../../components/dashboard/ProductCard";

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  console.log(products);

  // In calculateTotalPrice
  const calculateTotalPrice = () => {
    const total = products.reduce(
      (total, product) => total.plus(new Decimal(product.total)),
      new Decimal(0)
    );
    return total.toFixed(2);
  };

  const calculateTotalItems = () => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };

  return (
    <section className="py-10">
      <div className="flex justify-between items-center px-4 lg:px-0 mb-4">
        <h1 className="text-2xl font-bold">Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 px-4 lg:px-0">
        <div className="col-span-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onIncrement={() => dispatch(incrementQuantity(product.id))}
                onDecrement={() => dispatch(decrementQuantity(product.id))}
                onRemove={() => dispatch(removeProduct(product.id))}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 col-span-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
            <div className="flex justify-between items-center">
              <p className="text-lg">Total Items:</p>
              <p className="text-lg font-bold">{calculateTotalItems()}</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-lg">Total Price:</p>
              <p className="text-lg font-bold">₦{calculateTotalPrice()}</p>
            </div>

            {/* <button className="btn-block  bg-green-500 hover:bg-green-800 text-white text-lg btn btn-primary btn-md my-4 rounded-2xl">
              Checkout
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
