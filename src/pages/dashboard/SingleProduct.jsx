import { useParams } from "react-router";

const SingleProduct = () => {
  const { productName } = useParams();
  return <div>SingleProduct</div>;
};
export default SingleProduct;
