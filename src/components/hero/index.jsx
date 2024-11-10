// Hero.js
import React, { useState } from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';

const sliderImages = [
  'src/assets/istockphoto-1216782625-612x612.png', // Replace with actual image paths
  'src/assets/istockphoto-1442477795-612x612.png',
  'src/assets/istockphoto-1442478149-612x612.png',
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + sliderImages.length) % sliderImages.length);
  };

  const navigate = useNavigate()

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>POD Booking<br/> <span>System</span></h1>
        <p>A seamless booking system for POD workspaces, allowing users<br/> 
        to schedule, manage, and optimize reservations.</p>
        <button className="btn-primary" onClick={() => navigate('about-us')}>Learn More</button>
        <div className="stats">
          <div><strong>1k+</strong><span>Users</span></div>
          <div><strong>200+</strong><span>Locations</span></div>
          <div><strong>250k+</strong><span>Hours booked</span></div>
        </div>
      </div>
      
      <div className="hero-slider">
        <button className="prev" onClick={prevSlide}>❮</button>
        <img src={sliderImages[currentSlide]} alt="Hero Slider" />
        <button className="next" onClick={nextSlide}>❯</button>
      </div>
    </section>
  );
};

export default Hero;
