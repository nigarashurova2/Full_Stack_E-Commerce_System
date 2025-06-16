import Hero from "../components/Layout/Hero";
import BestSeller from "../components/Products/BestSeller";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import TopWearsWomenProducts from "../components/Products/TopWearsWomenProducts";

const Home = () => {
  return (
    <>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals/>
      <BestSeller/>
      <TopWearsWomenProducts/>
      <FeaturedCollection/>
      <FeaturesSection/>
    </>
  );
};

export default Home;
