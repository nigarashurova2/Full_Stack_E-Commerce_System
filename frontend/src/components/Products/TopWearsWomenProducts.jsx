import { useDispatch, useSelector } from "react-redux";
import ProductGrid from "./ProductGrid";
import { useEffect } from "react";
import { fetchProductsByFilters } from "../../redux/slices/productSlice";

const TopWearsWomenProducts = () => {
  const { products, loading, error } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Top Wear",
        limit: 8
      })
    );
  }, [dispatch]);

  if(loading) return <h1>Loading...</h1>
  if(error) {
    return <h1>Error...</h1>
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl text-center font-bold mb-4">
        Top Wears For Women
      </h2>
      <ProductGrid products={products} />
    </div>
  );
};

export default TopWearsWomenProducts;
