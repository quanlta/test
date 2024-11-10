import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CoffeeShopDetailPage.module.scss';
import api from '../../config/axios';
import ProductsPage from '../../pages/product'; // Adjust the import path as needed

const CoffeeShopDetailPage = () => {
  const { id } = useParams();
  const [coffeeShop, setCoffeeShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ content: '', rating: 0 });

  useEffect(() => {
    const fetchCoffeeShop = async () => {
      try {
        const response = await api.get('/coffeeshops');
        const shop = response.data.find(shop => shop.id === parseInt(id));
        setCoffeeShop(shop);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    const fetchFeedback = async () => {
      try {
        const response = await api.get(`/feedbacks/searchByCoffeeShopId?coffeeShopId=${id}`);
        setFeedback(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchCoffeeShop();
    fetchFeedback();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback({ ...newFeedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/feedbacks', { ...newFeedback, shopId: parseInt(id) });
      setFeedback([...feedback, { ...newFeedback, shopId: parseInt(id) }]);
      setNewFeedback({ content: '', rating: 0 });
    } catch (err) {
      setError(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.coffeeShopDetailPage} style={{ marginTop: "135px" }}>
      <div className={styles.shopDetails}>
        <img src={coffeeShop.image} alt={coffeeShop.name} className={styles.shopImage} />
        <div className={styles.shopInfo}>
          <h1>{coffeeShop.name}</h1>
          <p>Address: {coffeeShop.address}</p>
          <p>Phone: {coffeeShop.phone}</p>
          <p>Open: {coffeeShop.openTime} - {coffeeShop.closeTime}</p>
          <p>Description: {coffeeShop.description}</p>
        </div>
      </div>
      <ProductsPage shopId={parseInt(id)} />
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit} className={styles.feedbackForm}>
        <textarea
          name="content"
          value={newFeedback.content}
          onChange={handleInputChange}
          placeholder="Write your feedback"
          required
        />
        <input
          type="number"
          name="rating"
          value={newFeedback.rating}
          onChange={handleInputChange}
          min="0"
          max="5"
          placeholder="Rating (0-5)"
          required
        />
        <button type="submit">Submit Feedback</button>
      </form>

      <div className={styles.feedbackList}>
        {feedback.map((fb, index) => (
          <div key={index} className={styles.feedbackItem}>
            <p>{fb.content}</p>
            <p>Rating: {fb.rating}</p>
          </div>
        ))}
      </div>


    </div>
  );
};

export default CoffeeShopDetailPage;