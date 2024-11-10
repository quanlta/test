// Testimonials.js
import React from 'react';
import './index.scss';

const testimonials = [
  {
    id: 1,
    name: 'Morich Brown',
    review: 'This platform saved me a lot of time and helped me book amazing workspaces with ease!',
    rating: 4.5,
    image: 'src/assets/360_F_282720917_7ZtAfEqEfA6CRT66imV9avGWXEg9w6Jt.png',
  },
  {
    id: 2,
    name: 'Lota Mongestar',
    review: 'High productivity and the perfect ambiance for work. Highly recommend for all entrepreneurs!',
    rating: 5,
    image: 'src/assets/pexels-olly-846741.png',
  },
  {
    id: 3,
    name: 'Moe Lester',
    review: 'High productivity and the perfect ambiance for work. Highly recommend for all entrepreneurs!',
    rating: 5,
    image: 'src/assets/premium_photo-1663076217841-739a66882cf9.png',
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What Our Customers Say?</h2>
      <div className="testimonials-grid">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="testimonial">
            <img src={testimonial.image} alt={testimonial.name} />
            <h3>{testimonial.name}</h3>
            <p>{testimonial.review}</p>
            <div className="rating">Rating: {testimonial.rating}★</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
