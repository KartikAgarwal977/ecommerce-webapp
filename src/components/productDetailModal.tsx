import React, { Fragment, useState } from 'react';
import { Dialog, DialogPanel, Transition, DialogTitle } from '@headlessui/react';

interface ViewProductProps {
  images: string[];
  title: string;
  rate: string;
  discription: string;
  isOpen: boolean;
  onClose: () => void;
}

const ViewProduct: React.FC<ViewProductProps> = ({ images, title, rate, discription, isOpen, onClose }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <>
      <Transition
        show={isOpen}
        enter="duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="max-w-3xl w-full space-y-4 bg-white rounded-lg p-8 shadow-xl">
              <div className="flex justify-between items-center">
                <DialogTitle className="text-2xl font-bold text-gray-900">{title}</DialogTitle>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 rounded-full hover:scale-105 bg-slate-300 hover:bg-slate-500 font-extrabold transition ease-in-out duration-150">
                  &times;
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center">
                  <img
                    className="w-full h-96 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-150"
                    src={mainImage}
                    alt={title}
                  />
                  <div className="flex space-x-2 mt-4">
                    {images.map((img, index) => (
                      <img
                      key={index}
                      src={img}
                      alt={`thumbnail-${index}`}
                      className={`w-20 h-20 object-cover rounded-lg hover:scale-105 duration-150 cursor-pointer border-2 ${mainImage === img ? 'border-blue-500' : 'border-transparent'}`}
                      onClick={() => setMainImage(img)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                    <p className="text-lg text-gray-600 mt-2">&#8377; {rate}</p>
                  </div>
                  <div className="mt-3">
                    <button className="w-full hover:scale-105  bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition ease-in-out duration-150 mb-2">
                      Buy Now
                    </button>
                    <button className="w-full hover:scale-105  bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition ease-in-out duration-150">
                      Add to Cart
                    </button>
                  </div>
                  <DialogTitle className="text-2xl font-bold text-gray-900">Discription</DialogTitle>
                  <p className="mt-2 text-gray-600">{discription}</p>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ViewProduct;
