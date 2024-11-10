import React from "react";
import "./index.scss";
import Hero from "../../components/hero";
import PopularLocations from "../../components/popularLocations";
import ServiceSection from "../../components/ServiceSection";
import Features from "../../components/features";
import Testimonials from "../../components/testimonials";
import SearchByName from "../searchShopByName";
import BookPage from "../booking";

function HomePage() {
  return <div 
  style={{ marginTop: "135px",}}>
    <Hero />
    <SearchByName/>
    <BookPage/>
    <ServiceSection/>
    <Testimonials/>
    <Features/>
  </div>;
}

export default HomePage;
