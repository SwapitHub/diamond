import React, { useState } from 'react';
import axios from 'axios';

const ProductComponent = () => {
  const [product, setProduct] = useState({
    metalColor: 'defaultColor',
    style: 'defaultStyle',
    // Add other relevant properties
  });

  const [price, setPrice] = useState(
    {
        metalColor: 'defaultColor',
        style: 'defaultStyle',
        // Add other relevant properties
      }
  );

  const getPrice = async () => {
    try {
      const response = await axios.get(
        `http://www.overnightmountings.com/priceapi/service.php?action=pricecalculation&type=json&level=Polished&metaltype=14kt&metalcolor=${product.metalColor}&stylenumber=${product.style}&quality=${product.style},G-H&sizevalue=0&fingersizevalue=stock`
      );

      setPrice(response.data.price); // Update state with the fetched price
    } catch (error) {
      console.error('Error fetching price:', error);
    }
  };

  const handleColorChange = (color) => {
    setProduct((prevProduct) => ({ ...prevProduct, metalColor: color }));
    getPrice();
  };

  // Similar functions for other input changes can be added

  return (
    <div>
      {/* View HTML */}
      <div>
        <input
          type="radio"
          name="color"
          onClick={() => handleColorChange('While')}
          value="While"
        />
        <input
          type="radio"
          name="color"
          onClick={() => handleColorChange('Pink')}
          value="Pink"
        />
        <input
          type="radio"
          name="color"
          onClick={() => handleColorChange('Yellow')}
          value="Yellow"
        />
      </div>

      <p className="product_price">{price}</p>
    </div>
  );
};

export default ProductComponent;
