import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    document.removeEventListener("mousedown", handleClickOutside);
  });

  useEffect(() => {
    // simulate fetching
    setTimeout(() => {
      const fetchingProducts = [
        {
          _id: "1",
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=1",
              altText: "Stylish Jacket",
            },
          ],
        },
        {
          _id: "2",
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=2",
              altText: "Stylish Jacket",
            },
          ],
        },
        {
          _id: "3",
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=3",
              altText: "Stylish Jacket",
            },
          ],
        },
        {
          _id: "4",
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=4",
              altText: "Stylish Jacket",
            },
          ],
        },
        {
          _id: "5",
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=5",
              altText: "Stylish Jacket",
            },
          ],
        },
        {
          _id: "6",
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=6",
              altText: "Stylish Jacket",
            },
          ],
        },
        {
          _id: "7",
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=7",
              altText: "Stylish Jacket",
            },
          ],
        },
        {
          _id: "8",
          name: "Stylish Jacket",
          price: 120,
          images: [
            {
              url: "https://picsum.photos/500/500?random=7",
              altText: "Stylish Jacket",
            },
          ],
        },
      ];
      setProducts(fetchingProducts);
    }, 3000);
  });

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

      <div className="p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        {/* sort options */}
        <SortOptions />

        {/* product grid  */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
