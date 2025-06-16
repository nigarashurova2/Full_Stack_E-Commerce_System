import ProductGrid from "./ProductGrid";

const products = [
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Stylish Jacket 1",
      },
    ],
  },
  {
    _id: 2,
    name: "Product 2",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Stylish Jacket 2",
      },
    ],
  },
  {
    _id: 3,
    name: "Product 3",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Stylish Jacket 2",
      },
    ],
  },
  {
    _id: 4,
    name: "Product 4",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Stylish Jacket 2",
      },
    ],
  },
  {
    _id: 5,
    name: "Product 5",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=5",
        altText: "Stylish Jacket 2",
      },
    ],
  },
  {
    _id: 6,
    name: "Product 6",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
        altText: "Stylish Jacket 2",
      },
    ],
  },
  {
    _id: 7,
    name: "Product 7",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=7",
        altText: "Stylish Jacket 2",
      },
    ],
  },
  {
    _id: 8,
    name: "Product 8",
    price: 100,
    images: [
      {
        url: "https://picsum.photos/500/500?random=8",
        altText: "Stylish Jacket 2",
      },
    ],
  },
];

const TopWearsWomenProducts = () => {
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
