// Features.js
import React from 'react';
import { RocketOutlined, CreditCardOutlined, SmileOutlined } from '@ant-design/icons';
import './index.scss';

const features = [
  {
    id: 1,
    icon: <RocketOutlined style={{ fontSize: '2rem', color: '#6a0dad' }} />,
    title: 'Free Shipping',
    description: 'Enjoy free shipping for all your bookings within the platform.',
  },
  {
    id: 2,
    icon: <CreditCardOutlined style={{ fontSize: '2rem', color: '#6a0dad' }} />,
    title: 'Secure Payment',
    description: 'Our payment system is highly secure and easy to use.',
  },
  {
    id: 3,
    icon: <SmileOutlined style={{ fontSize: '2rem', color: '#6a0dad' }} />,
    title: 'Customer Support',
    description: 'We are always here to help you with any queries or support.',
  },
];

const Features = () => {
  return (
    <section className="features">
      <div className="features-grid">
        {features.map(feature => (
          <div key={feature.id} className="feature-item">
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
