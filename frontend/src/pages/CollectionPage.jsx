import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";
import { useParams, useSearchParams } from "react-router-dom";

const CollectionPage = () => {
  const sidebarRef = useRef(null);
  const [searchParams] = useSearchParams();
  const { collection } = useParams();
  const dispatch = useDispatch();
  const queryParams = Object.fromEntries([...searchParams]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        collection,
        ...queryParams,
      })
    );
  }, [searchParams, collection]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    // close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* filter sidebar */}
      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      <div className="p-4 w-full">
        <h2 className="text-2xl uppercase mb-4 w-full">All Collection</h2>
        {/* sort options */}
        <SortOptions />

        {/* product grid  */}
        <ProductGrid products={products} error={error} loading={loading} />
      </div>
    </div>
  );
};

export default CollectionPage;
