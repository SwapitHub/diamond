import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchSuggestion } from "./SearchSuggestion";
import $ from "jquery";
import { UserContext } from "../../App";
import Select from "react-select";
import LoaderSpinner from "../LoaderSpinner";
import debounce from "lodash.debounce";
import { IoIosClose } from "react-icons/io";

export const SearchPage = () => {
  const {
    searching,
    setSearching,
    showSuggestion,
    setShowSuggestion,
    setShowSuggestionHeader,
  } = useContext(UserContext);
  const [searchData, setSearchData] = useState([]);
  const [priceShorting, setPriceShorting] = useState();
  const [searchedProductCount, setSearchedProductCount] = useState();
  const [shapeFilter, setShapeFilter] = useState([]);

  const options = [
    { value: "best_seller", label: "Best Sellers" },
    { value: "low_to_high", label: "Price (Low to High)" },
    { value: "high_to_low", label: "Price (High to Low)" },
  ];

  const handlePriceChange = (selectedOption) => {
    setPriceShorting(selectedOption.value);
  };

  // ===========metal three color rose yellow white  =============================
  const white = "18K WHITE GOLD";

  const [metalColor, setMetalColor] = useState([]);
  const [changeName, setChangeName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [activePage, setActivePage] = useState([]);
  const [activeColor, setActiveColor] = useState(white);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [shapeData, setShapeData] = useState([]);
  const [ShopByStyle, setShopStyle] = useState([]);
  const [selectedMetalIds, setSelectedMetalIds] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/metalcolor"
      )
      .then((res) => {
        setMetalColor(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);

  const onChangeName = (value, className, slug) => {
    setChangeName({ value, className });
    setIsActive(!isActive);
    setActivePage(className);
    setActiveColor(value);
    console.log(value, className);
  };

  $(document).ready(function () {
    $(".resultdata > div.all-pages-data").each(function (i, odiv) {
      $(odiv)
        .find(".main-common-active > div")
        .click(function () {
          var index = $(this).index();
          $(odiv)
            .find(".outerDiv > a > .main-common-active.product-main-img > div")
            .removeClass("active");
          $(odiv).addClass("active");

          $(odiv)
            .find(".main-common-active > div.defaultImg")
            .removeClass("active")
            .eq(index)
            .addClass("active");

          $(odiv)
            .find(".outerDiv > a > div.main-common-active > div")
            .removeClass("active");

          $(odiv)
            .find(".outerDiv > a > div.main-common-active > div")
            .eq(index)
            .addClass("active");

          $(this).addClass("active");

          // Add 'metal-value-active' class to the corresponding .metal-name-item-name
          $(odiv)
            .find(".main-common-active .metal-name-item-name")
            .removeClass("metal-value-active");

          var metalNameItem = $(odiv).find(".metal-name-item-name").eq(index);
          metalNameItem.addClass("metal-value-active");

          // 'price-active' class from all price elements
          $(odiv)
            .find(".main-common-active .product-price")
            .removeClass("price-active");

          var priceElement;
          switch (index) {
            case 0:
              priceElement = $(odiv).find(".all-img1.product-price.defaultImg");
              break;
            case 1:
              priceElement = $(odiv).find(".all-img1.product-price.img-1");
              break;
            case 2:
              priceElement = $(odiv).find(".all-img1.product-price.img-2");
              break;
            case 3:
              priceElement = $(odiv).find(".all-img1.product-price.img-3");
              break;
            default:
              break;
          }

          priceElement.addClass("price-active");
        });
    });
  });

  // ==================== hover effect
  $(document).ready(function () {
    $(".resultdata > div.all-pages-data").each(function (i, odiv) {
      $(odiv)
        .find(".outerDiv > a .main-common-active > .all-card-four-color")
        .on("mouseenter", function () {
          var index = $(this).index();

          // Add class on hover
          $(odiv).addClass("hover-active");
          $(odiv)
            .find(".main-common-active .metal-name-item-name")
            .eq(index)
            .addClass("metal-hover-active");
          $(odiv)
            .find(".main-common-active > .product-price")
            .eq(index)
            .addClass("price-hover-active");
          $(odiv)
            .find(".main-common-active > .common-img")
            .eq(index)
            .addClass("common-img-hover-active");
          // $(odiv)
          //   .find(".main-common-active > .common-img.defaultImg")
          //   .eq(index)
          //   .removeClass("active");
        })
        .on("mouseleave", function () {
          var index = $(this).index();

          // Remove class on hover out
          $(odiv).removeClass("hover-active");
          $(odiv)
            .find(".main-common-active .metal-name-item-name")
            .eq(index)
            .removeClass("metal-hover-active");
          $(odiv)
            .find(".main-common-active > .product-price")
            .eq(index)
            .removeClass("price-hover-active");
          $(odiv)
            .find(".main-common-active > .common-img")
            .eq(index)
            .removeClass("common-img-hover-active");
        });
    });
  });

  // ======================metal three color rose yellow white end =============================

  // suggestion Api
  const [suggestionData, setSuggestionData] = useState([]);
  const [suggestion, setSuggestion] = useState();
  const handleSuggestion = (value) => {
    setSuggestion(value);
  };
  useEffect(() => {
    const delayedSuggestion = debounce(() => {
      axios
        .get(
          `http://ec2-3-139-195-178.us-east-2.compute.amazonaws.com/admin/api/v1/search-suggestion?q=${suggestion}`
        )
        .then((res) => {
          setSuggestionData(res.data.data);
        })
        .catch(() => {
          console.log("API error");
        });
    }, 500);

    delayedSuggestion(); // Initial call to avoid empty suggestion on component mount

    return delayedSuggestion.cancel;
  }, [suggestion]);

  //search api
  const [searchValue, setSearchValue] = useState("");
  function handleSearch(value) {
    setSearchValue(value);
    setSearching(value);
    if (value.length < 1) {
      setShowSuggestion(false);
    } else {
      setShowSuggestion(true);
    }
  }

  const handleCheckboxChange = (itemName) => {
    setSelectedMetalIds((prevNames) => {
      if (prevNames.includes(itemName)) {
        return prevNames.filter((name) => name !== itemName);
      } else {
        return [...prevNames, itemName];
      }
    });
  };

  const handleCheckboxChangeForStyle = (slug) => {
    setSelectedStyles((prevSlug) => {
      if (prevSlug.includes(slug)) {
        return prevSlug.filter((presentSlug) => presentSlug !== slug);
      } else {
        return [...prevSlug, slug];
      }
    });
  };

  const handleRemoveStyle = (slug) => {
    setSelectedStyles((prevSelectedStyles) =>
      prevSelectedStyles.filter((selectedStyle) => selectedStyle !== slug)
    );
  };
  const handleRemoveShape = (shape) => {
    setShapeFilter((prevSelectedStyles) =>
      prevSelectedStyles.filter((selectedShape) => selectedShape !== shape)
    );
  };
  const handleRemoveColor = (color) => {
    setSelectedMetalIds((prevSelectedColors) =>
      prevSelectedColors.filter((selectedColor) => selectedColor !== color)
    );
  };
  const handleResetAll = () => {
    setSelectedStyles([]);
    setShapeFilter([]);
    setSelectedMetalIds([]);
  };

  const handleItemClick = (shape) => {
    setShapeFilter((prevSelectedShapes) => {
      if (prevSelectedShapes.includes(shape)) {
        return prevSelectedShapes.filter(
          (selectedShape) => selectedShape !== shape
        );
      } else {
        return [...prevSelectedShapes, shape];
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    const delayedSearch = debounce(() => {
      axios
        .get(
          `http://ec2-3-139-195-178.us-east-2.compute.amazonaws.com/admin/api/v1/search?q=${searching}&page=${page}&shape=${
            shapeFilter ? shapeFilter : ""
          }&metal_color=${
            selectedMetalIds ? selectedMetalIds : ""
          }&ring_style=${selectedStyles ? selectedStyles : ""}`
        )
        .then((res) => {
          setSearchedProductCount(res.data);

          if (page > 1) {
            setSearchData((prevData) => [...prevData, ...res.data.data]);
            setLoading(false);
          } else {
            setSearchData(res.data.data);
          }

          setLoading(false);
        })
        .catch(() => {
          console.log("API error");
          setLoading(false);
        });
    }, 500);
    delayedSearch(); // Initial call to avoid empty search on component mount

    return delayedSearch.cancel;
  }, [searching, page, shapeFilter, selectedMetalIds, selectedStyles]);

  useEffect(() => {
    setPage(1);
  }, [searching, shapeFilter, selectedMetalIds, selectedStyles]);

  //  scroll pagination start============
  useEffect(() => {
    const handleInfiniteScroll = () => {
      try {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= 0.7 * scrollHeight && !loading) {
          setLoading(true);
          setPage((prev) => prev + 1);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [page, loading]);

  //  =====================scroll pagination end===================

  // =============== shop by shape start ==============
  useEffect(() => {
    axios
      .get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/diamondshape"
      )
      .then((res) => {
        setShapeData(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/product-style"
      )
      .then((res) => {
        setShopStyle(res.data.data);
        // setActiveStyleIds(menuShapeName)
      })
      .catch(() => {
        console.log("shop style api error");
      });
  }, []);

  return (
    <>
      <div className="search-filter-sort-parent">
        <div className="searching-bar-field container">
          <input
            type="search"
            placeholder="Search Product"
            onClick={() => {
              setShowSuggestionHeader(false);
            }}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyUp={(e) => handleSuggestion(e.target.value)}
            value={searching}
          />

          <button type="search">search</button>
        </div>
      </div>

      <div className="container choose-setting-pages-main">
        <div className="main-content choose-setting-pages">
          <div className="best-seller-main">
            <span>{searchedProductCount?.product_count} Results</span>

            <div className="best-seller">
              <form>
                <label for="#">Sort : </label>
                <Select
                  placeholder="Best Seller"
                  onChange={handlePriceChange}
                  options={options}
                />
              </form>
            </div>
          </div>
          <div className="search-sort-filter">
            <div className="search-sort-category">
              <div className="search-on-hover">
                Category
                <div className="dropdown-content ss__options">
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <form action="">
                        <input type="checkbox" id="engagement" />
                        <label for="engagement">Engagement Rings (370)</label>
                      </form>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="gemstones" />
                      <label for="gemstones">Gemstones (42)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="earrings" />
                      <label for="earrings">Earrings (18)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="necklaces" />
                      <label for="necklaces">Necklaces (14)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="engagement" />
                      <label for="engagement">Engagement Rings (370)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="gemstones" />
                      <label for="gemstones">Gemstones (42)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="earrings" />
                      <label for="earrings">Earrings (18)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="necklaces" />
                      <label for="necklaces">Necklaces (14)</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="search-sort-category">
              <div className="search-on-hover">
                Metal{" "}
                {selectedMetalIds.length !== 0
                  ? `(${selectedMetalIds.length})`
                  : null}
                <div className="dropdown-content ss__options">
                  {metalColor.map((item) => {
                    return (
                      <div className="ss__list filter-groups">
                        <div className="filter-ss-column">
                          <input
                            type="checkbox"
                            id={item.order_number}
                            checked={selectedMetalIds.includes(item.name)}
                            onChange={() => handleCheckboxChange(item.name)}
                          />
                          <label htmlFor={item.order_number}>{item.name}</label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="search-sort-category">
              <div className="search-on-hover">
                Styles{" "}
                {selectedStyles.length !== 0
                  ? `(${selectedStyles.length})`
                  : null}
                <div className="dropdown-content ss__options">
                  {ShopByStyle.map((item) => {
                    console.log(item);
                    return (
                      <div className="ss__list filter-groups">
                        <div className="filter-ss-column">
                          <input
                            type="checkbox"
                            checked={selectedStyles.includes(item.slug)}
                            onChange={() =>
                              handleCheckboxChangeForStyle(item.slug)
                            }
                          />
                          <label htmlFor={item.order_number}>{item.name}</label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="search-sort-category">
              <div className="search-on-hover">
                Gemstones
                <div className="dropdown-content ss__options">
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="engagement" />
                      <label for="engagement">Engagement Rings (370)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="gemstones" />
                      <label for="gemstones">Gemstones (42)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="earrings" />
                      <label for="earrings">Earrings (18)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="necklaces" />
                      <label for="necklaces">Necklaces (14)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="engagement" />
                      <label for="engagement">Engagement Rings (370)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="gemstones" />
                      <label for="gemstones">Gemstones (42)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="earrings" />
                      <label for="earrings">Earrings (18)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="necklaces" />
                      <label for="necklaces">Necklaces (14)</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="search-sort-category">
              <div className="search-on-hover">
                Shape{" "}
                {shapeFilter.length !== 0 ? `(${shapeFilter.length})` : null}
                <div className="dropdown-content ss__options">
                  {shapeData.map((item) => {
                    return (
                      <div className="ss__list filter-groups">
                        <div
                          className={`filter-ss-column ${
                            shapeFilter.includes(item.shape) ? "selected" : ""
                          }`}
                          onClick={() => handleItemClick(item.shape)}
                        >
                          <img src={item.icon} alt="" />
                          <label for="engagement">{item.shape}</label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="search-sort-category">
              <div className="search-on-hover">
                Origin
                <div className="dropdown-content ss__options">
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="engagement" />
                      <label for="engagement">Engagement Rings (370)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="gemstones" />
                      <label for="gemstones">Gemstones (42)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="earrings" />
                      <label for="earrings">Earrings (18)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="necklaces" />
                      <label for="necklaces">Necklaces (14)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="engagement" />
                      <label for="engagement">Engagement Rings (370)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="gemstones" />
                      <label for="gemstones">Gemstones (42)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="earrings" />
                      <label for="earrings">Earrings (18)</label>
                    </div>
                  </div>
                  <div className="ss__list filter-groups">
                    <div className="filter-ss-column">
                      <input type="checkbox" id="necklaces" />
                      <label for="necklaces">Necklaces (14)</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="show-suggestion-page"
            onMouseLeave={() => setShowSuggestion(false)}
          >
            {showSuggestion && (
              <SearchSuggestion
                suggestionData={suggestionData}
                suggestion={suggestion}
              />
            )}
          </div>
          <div className="bredCramStyleFilter">
            {selectedStyles.map((item) => (
              <div className="breadCram" key={item}>
                <Link to="#" onClick={() => handleRemoveStyle(item)}>
                  {item} <span>X</span>
                </Link>
              </div>
            ))}
            {shapeFilter.map((item) => (
              <div className="breadCram" key={item}>
                <Link to="#" onClick={() => handleRemoveShape(item)}>
                  {item} <span>X</span>
                </Link>
              </div>
            ))}
            {selectedMetalIds.map((item) => (
              <div className="breadCram" key={item}>
                <Link to="#" onClick={() => handleRemoveColor(item)}>
                  {item} <span>X</span>
                </Link>
              </div>
            ))}
            {(selectedStyles.length > 0 ||
              shapeFilter.length > 0 ||
              selectedMetalIds.length > 0) && (
              <div className="breadCram">
                <Link to="#" onClick={handleResetAll}>
                  Reset All <span>X</span>
                </Link>
              </div>
            )}
          </div>

          <div className="resultdata setings-Page-img">
            {searchData.length > 0 ? (
              searchData.map((item) => {
                const imageName = item?.default_image_url
                  .split("/")
                  .slice(-1)[0]
                  .split(".")
                  .shift();

                return (
                  <div className="resultdata all-pages-data" key={item.id}>
                    <div className="outerDiv">
                      <Link
                        to={`/detail-ring-product?slug=${item.slug}&color=${activeColor}`}
                      >
                        <div className="main-common-active product-main-img">
                          <div className="all-img1 common-img defaultImg ">
                            <span className="common-stand-img-1">
                              <img
                                src={item?.default_image_url}
                                alt={item.name}
                              />
                            </span>
                            <span className="common-stand-img white-stand-img">
                              <img
                                src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${imageName}/${imageName}.side.jpg`}
                                alt={item.name}
                              />
                            </span>
                          </div>

                          <div className="all-img1 img-1 common-img">
                            <span className="common-stand-img-1">
                              <img
                                src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${imageName}/${imageName}.alt.jpg`}
                                alt={item.name}
                              />
                            </span>
                            <span className="common-stand-img yellow-stand-img">
                              <img
                                src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${imageName}/${imageName}.side.alt.jpg`}
                                alt={item.name}
                              />
                            </span>
                          </div>

                          <div className="all-img1 img-2 common-img">
                            <span className="common-stand-img-1">
                              <img
                                src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${imageName}/${imageName}.alt1.jpg`}
                                alt={item.name}
                              />
                            </span>
                            <span className="common-stand-img rose-stand-img">
                              <img
                                src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${imageName}/${imageName}.side.alt1.jpg`}
                                alt={item.name}
                              />
                            </span>
                          </div>
                          <div className="all-img1 img-3 common-img">
                            <span className="common-stand-img-1">
                              <img
                                src={item.default_image_url}
                                alt={item.name}
                              />
                            </span>
                            <span className="common-stand-img platinum-stand-img">
                              <img
                                src={`https://www.overnightmountings.com/gemfind/library/Images_And_Videos/${imageName}/${imageName}.side.jpg`}
                                alt={item.name}
                              />
                            </span>
                          </div>
                        </div>

                        <div className="main-common-active all-card-four-colors ">
                          {metalColor.map((MetalColor, index) => (
                            <div
                              key={MetalColor.id}
                              className={`all-card-four-color  ${
                                item.id === activePage &&
                                activeColor === MetalColor.name
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <Link
                                to="#"
                                style={{
                                  background: MetalColor.color,
                                }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  onChangeName(MetalColor.value, item.id);
                                }}
                              ></Link>
                            </div>
                          ))}
                        </div>
                        <div className="main-common-active">
                          <div className="metal-name-by-default">
                            <span>{item.name}</span>
                          </div>
                          {metalColor.map((MetalValue, index) => (
                            <div
                              className="metal-name-item-name"
                              key={MetalValue.id}
                            >
                              <span>
                                {MetalValue.value} {item.name}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="main-common-active">
                          <div className="all-img1 product-price defaultImg">
                            ${item.white_gold_price}
                          </div>
                          <div className="all-img1 product-price img-1">
                            ${item.yellow_gold_price}
                          </div>
                          <div className="all-img1 product-price img-2 ">
                            ${item.rose_gold_price}
                          </div>
                          <div className="all-img1 product-price img-3 ">
                            ${item?.platinum_price}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <h3 className="center">Data not found</h3>
            )}
          </div>
        </div>
      </div>
      <div>{loading && <LoaderSpinner />}</div>
    </>
  );
};
