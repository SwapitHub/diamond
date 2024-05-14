import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

export const SearchSuggestion = ({
  suggestionData,
  suggestion,
}) => {
  const { setSearching, setShowSuggestion, setShowSuggestionHeader } = useContext(UserContext);
  return (
    <>
      <div className="search-result-main">
        <div className="container">
          <div className="search-inner">
            <div className="search-top-content">
              <h5>Search Suggestions</h5>

              <div className="ss__autocomplete__terms__options">
                <ul className="search-list">
                  {suggestionData.map((item) => {
                    return (
                      <>
                        <li>
                          <Link
                            to="/search"
                            onClick={() => {
                              setSearching(item?.name);
                              setShowSuggestion(false);
                              setShowSuggestionHeader && setShowSuggestionHeader(false);
                            }}
                          >
                            {item?.name}
                          </Link>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="search-product-list-parent">
              <h5>Product Suggestions</h5>
              <div className="search-product-list-main">
                {suggestionData.map((item) => {
                  console.log(item);
                  return (
                    <>
                      <div className="search-product-list">
                        <div className="search-product-list-left-img">
                          <img src={item?.default_image_url} alt="" />
                        </div>
                        <div className="search-product-list-right-description">
                          <div className="ss__result__details__title">
                            <Link
                              to={`/detail-ring-product?slug=${item.slug}&color=18K WHITE GOLD`}
                              onClick={() => {
                                setSearching(item?.name);
                                setShowSuggestion(false);
                                setShowSuggestionHeader && setShowSuggestionHeader(false);
                              }}
                            >
                              {item?.name}
                            </Link>
                            <div className="caption-price usd">
                              <span className="ss__currency-symbol">$</span>{" "}
                              {item?.white_gold_price}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}

                <div className="ss__autocomplete__content__info">
                  <Link to="#">See more results for "{suggestion}"</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
