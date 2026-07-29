import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import BrandsSection from "../components/home/BrandsSection";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedProductsSection from "../components/home/FeaturedProductsSection";
import PromoBanner from "../components/home/PromoBanner";
import BestSellersSection from "../components/home/BestSellersSection";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <BrandsSection />

      <CategoriesSection />

      <FeaturedProductsSection />

      <PromoBanner />

      <BestSellersSection />

      <Footer />
    </>
  );
}