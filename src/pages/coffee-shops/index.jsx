import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CoffeeShopsPage.module.scss';
import api from '../../config/axios';
import logo from '../../assets/logo.png'; // Đảm bảo đường dẫn đúng đến logo.png

const CoffeeShopsPage = () => {
  const [coffeeShops, setCoffeeShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      try {
        const response = await api.get('/coffeeshops');
        setCoffeeShops(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCoffeeShops();
  }, []);

  const handleSearch = async () => {
    if (inputValue.trim() === '') {
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`/coffeeshops/searchByName?name=${inputValue}`);
      setCoffeeShops(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
      e.target.blur(); // Move focus out of the input field
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.coffeeShopsPage} style={{ marginTop: "135px" }}>
      <h1>Coffee Shops</h1>
      <h2>Search by name</h2>
      <p>Find a coffee shop by name</p>
      <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search by name"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={styles.searchInput}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={handleSearch}
          className={styles.searchButton}
        >
          Search
        </button>
      </form>
      <div className={styles.coffeeShopsGrid}>
        {coffeeShops.map(shop => (
          <Link to={`/coffee-shops/${shop.id}`} key={shop.id} className={styles.coffeeShopCard}>
            <img src={shop.image} alt={shop.name} />
            <h2>{shop.name}</h2>
            <p>{shop.address}</p>
          </Link>
        ))}
      </div>
    </div>
  
  );
};

export default CoffeeShopsPage;