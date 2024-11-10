// ServiceSection.js
import React from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';

const ServiceSection = () => {
  const navigate = useNavigate()

  return (
    <section className="service-section">
      <div className="service-content">
        <h2>We Provide You Super Quality Service</h2>
        <p>
          To keep your business growing in today's fast-paced environment, it's<br/>
          essential to offer comfortable and flexible workspaces. We ensure <br/>
          that you have everything you need to succeed.
        </p>
        <button className="btn-primary" onClick={() => navigate('about-us')}>Learn More</button>
      </div>
      <div className="service-image">
        <img src="src\assets\istockphoto-930090080-612x612.png" alt="POD workspace" />
      </div>
    </section>
  );
};

export default ServiceSection;
