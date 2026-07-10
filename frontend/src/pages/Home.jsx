import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

console.log("Home component rendered");
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("fetching starts");
        const res = await fetch('/api/products');
        console.log('fetching is end')
        
        if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
}
        
        const data = await res.json();
        console.log("hello",data);
        setProducts(data.slice()); // Featured products
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    
    <div className="home-container">
      <div className="hero-banner">
        <h1>Welcome to DanCart</h1>
        <p>Discover the best products at unbeatable prices.</p>
      </div>
      <h2>Featured Products</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;