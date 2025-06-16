import { Link } from "react-router-dom";
import mensCollectionImage from "../../assets/mens-collection.webp";
import womensCollectionImage from "../../assets/womens-collection.webp";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-6">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* women collection */}
        <div className="relative flex-1">
          <img
            src={womensCollectionImage}
            alt="Women's collection"
            className="w-full h-[700px] object-cover "
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-4 font-semibold">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Women's Collection
            </h3>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline text-sm"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* men collection */}
        <div className="relative flex-1">
          <img
            src={mensCollectionImage}
            alt="Women's collection"
            className="w-full h-[700px] object-cover "
          />
          <div className="absolute bottom-8 left-8 bg-white/90 p-4 font-semibold">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Men's Collection
            </h3>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline text-sm"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
