import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "./ProductDetails";
import { useEffect } from "react";
import { bestSellerProduct } from "../../redux/slices/productSlice";

const BestSeller = () => {
  const { bestSeller, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bestSellerProduct());
  }, [dispatch]);

  useEffect(() => {
    console.log(bestSeller, "bestSeller");
  }, [bestSeller]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;
  return (
    <div className="mt-8">
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {/* <ProductDetails productId={bestSeller._id} /> */}
    </div>
  );
};

export default BestSeller;
