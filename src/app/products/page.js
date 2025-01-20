"use client";
import Card from "../components/Card";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init();
    const fetchProducts = async () => {

    try {
      const response = await fetch(`${apiUrl}/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.data.products);
      } else {console.error("Failed to fetch products");}
      } catch (error) {console.error("Error fetching products:", error);
      } finally {setIsLoading(false);}
    };
    fetchProducts();
  }, [apiUrl]);

  const getImageUrl = (imagePath) => {
    return `${apiUrl}/products${imagePath}`;};

  if (isLoading) {
    return (<div className="flex justify-center items-center h-screen"><Spinner /></div>);
  }

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h1 className="text-[35px] text-neutral-900 font-bold mt-8 mb-8 motion-preset-compress">Produktai</h1>
        <div className="flex flex-wrap justify-center gap-6">
        {products.map((product) => (
          <div key={product._id} className="p-4" data-aos="zoom-in-down">
            <Card image={getImageUrl(product.swiperImages?.swiperImage1)} title={product.name} description={product.summary} link={`/product/${product._id}`}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
