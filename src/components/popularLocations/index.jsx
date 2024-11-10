// PopularLocations.js
import React from 'react';
import './index.scss';

const locations = [
  { id: 1, name: 'Seven Days Coffee', price: '50,000 per hour', image: 'src/assets/location/1.png' },
  { id: 2, name: 'Highland Coffee', price: '30,000 per hour', image: 'src/assets/location/2.png' },
  { id: 3, name: 'Starbucks Coffee', price: '75,000 per hour', image: 'src/assets/location/3.png' },
  { id: 4, name: 'Milano Coffee', price: '30,000 per hour', image: 'src/assets/location/4.png' },
];

const PopularLocations = () => {
  return (
    <section className="popular-locations">
      <h2>Our Popular Locations</h2>
      <p>The website provides detailed information on POD workspace<br/>
        locations, including addresses, amenities, availability, and user<br/>
        reviews to help users choose the best fit for their needs.</p>
      <div className="locations-grid">
        {locations.map(location => (
          <div key={location.id} className="location">
            <img src={location.image} alt={location.name} 
            style={{height: '400px',
                width:'370px'
            }}/>
            <h3>{location.name}</h3>
            <p>{location.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularLocations;
