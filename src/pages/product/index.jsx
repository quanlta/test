import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../config/axios";
import { addProduct } from '../../redux/features/cartSlice';
import './ProductsPage.scss';

const ProductsPage = ({ shopId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addProduct({ ...product, shopId }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="products-page" style={{ marginTop: "135px", }}>
      <h1>Our Products</h1>
      <div className="products-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: {product.price} vnd</p>
              <button onClick={() => handleAddToCart(product)} className="buy-button">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;