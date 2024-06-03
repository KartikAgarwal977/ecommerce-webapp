import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import Hero from '../components/Hero';
import CardView from '../components/cardview';

interface Product {
  id: string;
  images: string[];
  name: string;
  rate: string;
  description: string;
  inStock: boolean;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const db = getDatabase();
    const productRef = ref(db, 'products');

    const handleData = (snapshot: any) => {
      const data = snapshot.val();
      if (data) {
        const productArray = Object.keys(data).map(key => ({
          id: key,
          images: data[key].imageUrls || [], 
          name: data[key].name,
          rate: data[key].rate,
          discription: data[key].description,
          inStock: data[key].inStock,
        }));
        console.log(productArray);
        setProducts(productArray);
      }
    };

    const unsubscribe = onValue(productRef, handleData);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Hero />
      <div className="p-4">
        <h2 className="text-3xl font-bold mb-4">New Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            product.inStock && (
              <CardView
                key={product.id}
                images={product.images}
                title={product.name}
                rate={product.rate}
                discription={product.description}
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
