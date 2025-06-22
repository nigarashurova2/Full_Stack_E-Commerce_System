import { FaRegEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const products = [
  {
    _id: "1233",
    name: "Product 1",
    price: 120,
    sku: 123,
  },
  {
    _id: "535",
    name: "Product 2",
    price: 120,
    sku: 123,
  },
];
const ProductManagement = () => {
  const handleDeleteProduct = (productId) => {
    console.log(productId);
  };

  return (
    <div className="max-w-7xl p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Product Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Price</th>
              <th className="py-2 px-3">Sku</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-b-gray-400 cursor-pointer hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="py-3 px-4">{product.price}</td>
                  <td className="py-3 px-4">{product.sku}</td>
                  <td className="py-3 px-4 flex items-center space-x-3">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white rounded p-2 inline-block"
                    >
                      <FaRegEdit />
                    </Link>
                    <button
                      onClick={handleDeleteProduct(product._id)}
                      className="bg-red-500 hover:bg-red-700 cursor-pointer text-md text-white px-2 py-2 rounded"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={4}>No Product Data found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
