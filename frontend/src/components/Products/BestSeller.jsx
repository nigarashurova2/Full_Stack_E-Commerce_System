import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "./ProductDetails";
import { useEffect } from "react";
import { bestSellerProduct } from "../../redux/slices/productSlice";

const BestSeller = () => {
  const { bestSeller, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bestSellerProduct());
  }, [dispatch]);


  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="mt-8">
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSeller && <ProductDetails productId={bestSeller._id} />}
    </div>
  );
};

export default BestSeller;
