import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../Product/ProductCard';

const HomeSectionCarousel = () => {
    const { products } = useSelector((store) => store);
    console.log( "Home page products", products);
 
  return (
    <div className="lg:col-span-4 w-full">
      <div className="flex flex-wrap justify-center bg-white py-5">
        {products?.content?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;