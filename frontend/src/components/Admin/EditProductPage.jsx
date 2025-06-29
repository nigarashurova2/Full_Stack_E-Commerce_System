import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productSlice";
import axios from "axios";
import { updateProduct } from "../../redux/slices/adminProductSlice";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const { id } = useParams();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/150?random=1",
      },
      {
        url: "https://picsum.photos/150?random=2",
      },
    ],
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let mainValue = value;
    if (name === "sizes" || name === "colors") {
      mainValue = value.split(",").map((size) => size.trim());
    }
    setProductData({
      ...productData,
      [name]: mainValue,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
    navigate("/admin/products");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 w-full rounded-md"
            placeholder="Enter product name"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block font-semibold mb-2">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="p-2 border border-gray-300 w-full rounded-md"
            placeholder="Enter product description"
            rows={4}
          ></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="price" className="block font-semibold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="p-2 border border-gray-300 w-full rounded-md"
            placeholder="Enter product price"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="countInStock" className="block font-semibold mb-2">
            Count In Stock
          </label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="p-2 border border-gray-300 w-full rounded-md"
            placeholder="Enter product countInStock"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="sku" className="block font-semibold mb-2">
            Sku
          </label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="p-2 border border-gray-300 w-full rounded-md"
            placeholder="Enter product sku"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="sizes" className="block font-semibold mb-2">
            Sizes (comma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={handleChange}
            className="p-2 border border-gray-300 w-full rounded-md"
            placeholder="Enter product sizes"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="colors" className="block font-semibold mb-2">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={handleChange}
            className="p-2 border border-gray-300 w-full rounded-md"
            placeholder="Enter product colors"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="images" className="block font-semibold mb-2">
            Upload Image
          </label>
          <input
            type="file"
            name="images"
            onChange={handleImageUpload}
            className=""
          />
          {uploading && <p>Uploading Image...</p>}

          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
