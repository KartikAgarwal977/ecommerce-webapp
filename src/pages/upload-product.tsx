import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import app from '../firebase-config';

const UploadProduct: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [inStock, setInStock] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const storage = getStorage(app);
  const db = getDatabase(app);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (images.length > 0) {
      try {
        const productId = uuidv4(); // Generate a unique product ID
        const imageUrls = [];

        for (const image of images) {
          const imageRef = ref(storage, `Product_images/${productId}/${image.name}`);
          await uploadBytes(imageRef, image);
          const imageUrl = await getDownloadURL(imageRef);
          imageUrls.push(imageUrl);
        }

        // Save product details to Realtime Database
        await set(dbRef(db, `products/${productId}`), {
          id: productId,
          name: productName,
          description: description,
          rate: price,
          imageUrls: imageUrls,
          inStock: inStock
        });

        setLoading(false);
        setProductName('');
        setPrice('');
        setDescription('');
        setImages([]);
        setImagePreviews([]);
        setInStock(false);

        alert('Product uploaded successfully!');
      } catch (error) {
        console.error("Error uploading product: ", error);
        setLoading(false);
      }
    } else {
      alert("Please select at least one image to upload.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Upload Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Product Name</label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rate" className="block text-gray-700 font-bold mb-2">Price (in rupee)</label>
            <input
              id="rate"
              type="number"
              className="w-full px-3 py-2 border rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="images" className="block text-gray-700 font-bold mb-2">Upload Images</label>
            <input
              id="images"
              type="file"
              className="w-full"
              onChange={handleImageChange}
              accept="image/*"
              multiple
            />
            <div className="flex flex-wrap mt-4">
              {imagePreviews.map((preview, index) => (
                <img key={index} src={preview} alt={`Preview ${index}`} className="w-1/3 h-32 object-cover m-1" />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
              />
              <span className="ml-2 text-gray-700">In Stock</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
