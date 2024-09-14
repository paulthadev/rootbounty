import potatoe from "/potatoe.png";

const Cart = () => {
  const products = [
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
  ];

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
                    alt="Product 1"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="mt-4">
                    <h2 className="text-lg capitalize font-bold">
                      {product.productName}
                    </h2>
                    <p className="text-sm">Price: ₦{product.price}</p>
                    <p className="text-sm">Quantity: {product.quantity}</p>
                    <p className="text-sm font-bold">Total: ₦{product.total}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-2 col-span-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Cart Summary</h2>
            <div className="flex justify-between items-center">
              <p className="text-sm">Total Items:</p>
              <p className="text-sm font-bold">2</p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm">Total Price:</p>
              <p className="text-sm font-bold">$400</p>
            </div>

            <button className=" btn-block bg-green-500 hover:bg-green-800 text-white py-2 px-4 my-4 rounded-lg">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
