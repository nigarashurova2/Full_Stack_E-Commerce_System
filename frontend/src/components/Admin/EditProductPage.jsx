import { useState } from "react";

const EditProductPage = () => {
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(productData);
    
  }

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
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductPage;
