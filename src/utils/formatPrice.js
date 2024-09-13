const formatPrice = (price) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN", // Nigerian Naira
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export default formatPrice;
