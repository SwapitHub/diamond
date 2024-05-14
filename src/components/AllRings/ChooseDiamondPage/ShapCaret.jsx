import React, { useState, useEffect } from "react";
import Slider from "react-slider";
import "../../../App.css";
import { useSelector } from "react-redux";
import { productList } from "../../../redux/productAction";
import { useDispatch } from "react-redux";
import { TablePopUp } from "./TablePopUp";
import { Link } from "react-router-dom";

const MIN = parseFloat(0);
const MAX = parseFloat(20);

const DIAMIN = 10000;
const DIAMAX = 100000;

const ShapCaret = () => {
  const [values, setValues] = useState([MIN, MAX]);
  const [diamondPrice, setDiamondPrice] = useState([DIAMIN, DIAMAX]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const dispatch = useDispatch();
  let data = useSelector((state) => state.productData);
  console.warn("data in========== shop component", data);

  useEffect(() => {
    dispatch(productList());
  }, []);

  function eventHandler(value) {
    setSearch(value);
  }

  const filterData = () => {
    const filtered = data.filter(function (item) {
      if (item.multiCategory.toLowerCase() === search.toLowerCase()) {
        if (item.carat >= values[0] && item.carat <= values[1]) {
          return (
            item.ringPrice >= diamondPrice[0] &&
            item.ringPrice <= diamondPrice[1]
          );
        }
      }
      if (item.shape.toLowerCase() === search.toLowerCase()) {
        if (item.carat >= values[0] && item.carat <= values[1]) {
          return (
            item.ringPrice >= diamondPrice[0] &&
            item.ringPrice <= diamondPrice[1]
          );
        }
      }
      if (item.carat >= values[0] && item.carat <= values[1]) {
        return (
          item.ringPrice >= diamondPrice[0] && item.ringPrice <= diamondPrice[1]
        );
      } else {
        return item.carat >= values[0] && item.carat <= values[1];
      }
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [values, search, diamondPrice]);

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

  const [isOpen, setIsOpen] = useState(false);
  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }
  // ==============multi category end===========
  return (
    <>
      <div className="main-content">
        <div className="container">
          <h3>Design Your Own</h3>
           <h3>Diamond Engagement Ring</h3>
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

          <div className="main-content-p">
            <p onClick={() => handleFilterButtonClick("Classic")}>Classic</p>
            <p onClick={() => handleFilterButtonClick("natural inspire")}>
              natural inspire
            </p>
            <p onClick={() => handleFilterButtonClick("three stone")}>
              three stone
            </p>
            <p onClick={() => handleFilterButtonClick("hello")}>hello</p>
            <p onClick={() => handleFilterButtonClick("luxe")}>luxe</p>
            <p onClick={() => handleFilterButtonClick("demo")}>demo</p>
          </div>

          <div className="range-filtering-price">
            <h3>
              Price <span>Range</span>
            </h3>
            <div className="values">
              {values[0]} - {values[1]}
            </div>

            <label>Carat </label>
            <Slider
              className="slider"
              onChange={setValues}
              value={values}
              min={MIN}
              max={MAX}
            />

            <div className="values">
              ${diamondPrice[0]} - ${diamondPrice[1]}
            </div>
            <label>Diamond Price</label>
            <Slider
              className="slider"
              onChange={setDiamondPrice}
              value={diamondPrice}
              min={DIAMIN}
              max={DIAMAX}
            />
          </div>
          <div className="resultdata">
            <div>
              <Link to="">
                <table id="customers" className="customers-table">
                  <thead>
                    <tr>
                      <th>Shape</th>
                      <th>Price</th>
                      <th>Carat</th>
                      <th>multiCategory</th>
                    </tr>
                  </thead>
                </table>
              </Link>
            </div>
            <div>
              <span>{isOpen && <TablePopUp toggle={toggle} />}</span>
              <table id="customers">
                <tbody>
                  {filteredData.map((item) => {
                    return (
                      <>
                        <Link to={`/mainPage3/${item.id} `}>
                          <tr key={item.id} onClick={() => toggle()}>
                            <td>{item.shape}</td>
                            <td>${item.diamondPriceApi}</td>
                            <td>{item.carat}</td>
                            <td>{item.multiCategory}</td>
                          </tr>
                        </Link>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShapCaret;
