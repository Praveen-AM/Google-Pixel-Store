import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Offercard from "../components/Offercard";
import Offersdata from "../data/Offersdata";

const Offerspage = () => {
  const [offers, setOffers] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const parsePrice = (val) => {
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      return parseFloat(val.replace(/[₹,]/g, "")) || 0;
    }
    return 0;
  };

  useEffect(() => {
    let filtered = [...Offersdata];
    if (selectedCategory !== "All") {
      filtered = filtered.filter((offer) => offer.category === selectedCategory);
    }
    if (sortOption === "lowToHigh") {
      filtered.sort((a, b) => parsePrice(a.discount) - parsePrice(b.discount));
    } else if (sortOption === "highToLow") {
      filtered.sort((a, b) => parsePrice(b.discount) - parsePrice(a.discount));
    }

    setOffers(filtered);
  }, [sortOption, selectedCategory]);

  return (
    <div>
      <Banner />

      <section id="offers" className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border px-4 py-2 rounded text-sm w-full sm:w-auto"
          >
            <option value="All">All Categories</option>
            <option value="Pixel">Pixel</option>
            <option value="Buds">Buds</option>
            <option value="Nest">Nest</option>
          </select>


          <select
            value={sortOption}
            onChange={handleSortChange}
            className="border px-4 py-2 rounded text-sm w-full sm:w-auto"
          >
            <option value="">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <Offercard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Offerspage;
