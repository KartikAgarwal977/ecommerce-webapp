import React, { useState } from 'react';
import ViewProduct from './productDetailModal';

interface CardViewProps {
  key: string;
  images: string[];
  title: string;
  rate: string;
  discription: string;
}

const CardView: React.FC<CardViewProps> = ({ images, title, rate, discription}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainImage, setMainImage] = useState(images[0]);

  const viewProduct = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white cursor-pointer" onClick={viewProduct}>
        <img className="w-full h-40 object-cover" src={mainImage} alt={title} />
        <div className="flex justify-center mt-2 space-x-2">
          {images.map((img, index) => (
            <img
              key={index}
              className="w-10 h-10 object-cover rounded cursor-pointer"
              src={img}
              alt={`thumbnail-${index}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base font-bold">&#8377; {rate}</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg w-11/12 max-w-3xl">
            <button onClick={closeModal} className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-800">
              &times;
            </button>
            <ViewProduct
              images={images}
              title={title}
              rate={rate}
              isOpen={true}
              description= {discription}         
              onClose={closeModal}/>
          </div>
        </div>
      )}
    </>
  );
};

export default CardView;
