import React, { useState, useEffect } from 'react';
import Slider from 'react-slider';
import {useSelector} from 'react-redux'
import { productList } from '../../../redux/productAction';
import { useDispatch } from 'react-redux'
import "../../../App.css";
import { Link } from 'react-router-dom';

const MIN = parseFloat(0);
const MAX = parseFloat(20);

const DIAMIN = 10000;
const DIAMAX = 100000;

const MoreFilters = () => {
  const [values, setValues] = useState([MIN, MAX]);
  const [diamondPrice, setDiamondPrice] = useState([DIAMIN, DIAMAX]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [colorData, setColorData] = useState('');
  const [multiCategoryData, setMultiCategoryData] = useState('')
  const [selectedFilters, setSelectedFilters] = useState([]);
  
  const dispatch = useDispatch();
  let data = useSelector((state) => state.productData);
  console.warn("data in========== shop component", data);

  useEffect(()=>{
    dispatch(productList())
  },[]) 

  function eventHandler(value) {
    setSearch(value);
    console.warn("============");
  }

  const filterData = () => {
    const filtered = data.filter(function (item) {
      if (item.color.toLowerCase() === search.toLowerCase()) {
        return item.ringPrice >= diamondPrice[0] && item.ringPrice <= diamondPrice[1];
      }  
      if (item.multiCategory.toLowerCase() === search.toLowerCase()) {
        return item.ringPrice >= diamondPrice[0] && item.ringPrice <= diamondPrice[1];
      }        

      if (item.shape.toLowerCase() === search.toLowerCase()) {      
          return item.ringPrice >= diamondPrice[0] && item.ringPrice <= diamondPrice[1];        
      }
else{
  return item.ringPrice >= diamondPrice[0] && item.ringPrice <= diamondPrice[1];        

}
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [values, search, diamondPrice, colorData, multiCategoryData]);

  // ===========multi category start==============
 

  const handleFilterButtonClick = (selectedMultiCategory) => {
    setSearch(selectedMultiCategory);
    if (selectedFilters.includes(selectedMultiCategory)) {
      let filters = selectedFilters.filter(
        (el) => el !== selectedMultiCategory
        
      );
      setSelectedFilters(filters);
    
    } else {
      setSelectedFilters([...selectedFilters, selectedMultiCategory]);
    }
  };   

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      const tempItems = data.filter((item) =>
        selectedFilters.includes(item.multiCategory)
      );
      setFilteredData(tempItems);
    } else {
      setFilteredData(data);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters, data]);


  // ==================local storage
  
  // ==============multi category end===========
  return (
    <>
      <h1>This is the Settings page</h1>
      <div className="main-content container">
        <div className='more-filter-diamond-ring'>
          <div className="main-content-p">
            <p onClick={() => eventHandler("Round")}>Round</p>
            <p onClick={() => eventHandler("Oval")}>Oval</p>
            <p onClick={() => eventHandler("Cushion")}>Cushion</p>
            <p onClick={() => eventHandler("Pear")}>Pear</p>
            <p onClick={() => eventHandler("Princess")}>Princess</p>
            <p onClick={() => eventHandler("Emerald")}>Emerald</p>
            <p onClick={() => eventHandler("Marquise")}>Marquise</p>
            <p onClick={() => eventHandler("Asscher")}>Asscher</p>
            <p onClick={() => eventHandler("Radient")}>Radient</p>
            <p onClick={() => eventHandler("Heart")}>Heart</p>
          </div>


          <div className='range-filtering-price'>
            <h3>Price <span>Range</span></h3>

            <div className="values">${diamondPrice[0]} - ${diamondPrice[1]}</div>
            <label>Diamond Price</label>
            <Slider
              className='slider'
              onChange={setDiamondPrice}
              value={diamondPrice}
              min={DIAMIN}
              max={DIAMAX}
            />
          </div>
        </div>
        {/* ==================multi category start========================= */}
        <div>
          <div className="buttons-container">
          <div className="main-content-p">
            <p onClick={() => handleFilterButtonClick("Classic")}>Classic</p>
            <p onClick={() => handleFilterButtonClick("natural inspire")}>natural inspire</p>
            <p onClick={() => handleFilterButtonClick("three stone")}>three stone</p>
            <p onClick={() => handleFilterButtonClick("hello")}>hello</p>
            <p onClick={() => handleFilterButtonClick("luxe")}>luxe</p>
            <p onClick={() => handleFilterButtonClick("demo")}>demo</p>            
          </div>
          </div>
        </div>
        {/* ================multi category end================== */}

        <div className='filter-metal'>
          <span onClick={() => eventHandler("Platinum")}>Platinum</span>
          <span onClick={() => eventHandler("White Gold")}>White Gold</span>
          <span onClick={() => eventHandler("Yellow Gold")}>Yellow Gold</span>
          <span onClick={() => eventHandler("Rose Gold")}>Rose Gold</span>
        </div>
      </div>

      <div className="resultdata setings-Page-img">
        {
          filteredData.map((item) => {
            // console.warn("item setting data", item);
            return (
              <>
              <Link to={`/mainPage2/${item.id} `}>
                <div key={item.id} className='all-pages-data '>
                  <div className='all-img1'> <img src={item.img1} /></div>
                  <div className='all-img2'> <img src={item.img2} /></div>
                  <div className='all-img3'> <img src={item.img3} /></div>
                  <div className='all-img4'> <img src={item.img4} /></div>

                  <div className='all-card-four-color'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <p>{item.name}</p>
                  <p>${item.ringPrice}</p>
                  <p>{item.color}</p>
                  <p>{item.shape}</p>
                  <p className="multiCategory">{item.multiCategory}</p>
                </div>
                </Link>
              </>
            )
          })
        }
      </div>
    </>
  );
};

export default MoreFilters;
