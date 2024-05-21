import { Link, NavLink } from "react-router-dom";
import samaLogo from "../../images/samaLogo.png";
import { BsBag, BsFillBellFill } from "react-icons/bs";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineClose,
} from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiUpArrow, BiDownArrow, BiPhoneCall } from "react-icons/bi";
import { useContext, useEffect, useId, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-use-history";
import { Account } from "./Account";
import { Cart } from "./Cart";
import { CartHover } from "./CartHover";
import { OrderHistory } from "./OrderHistory";
import { WishlistHover } from "./WishlistHover";
import { UserContext } from "../../App";
import { CartHoverData } from "./CartHoverData";
import { WishlistHoverDatabase } from "./WishlistHoverDatabase";
import { SearchSuggestion } from "./SearchSuggestion";
import debounce from "lodash.debounce";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const history = useHistory();
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(null);
  const {
    searching,
    setSearching,
    setShowSuggestion,
    setShowSuggestionHeader,
    showSuggestionHeader,
    baseUrl
  } = useContext(UserContext);

  const ToggleClass = () => {
    setActive(!active);
  };
  let location = useLocation();
  console.log(location.pathname);

  const cartDetails = useSelector((state) => state.productDataCart);
  const wishListDataBase = useSelector((state) => state.productDataWishlist);
  console.log(wishListDataBase?.length);

  const toggle = (id) => {
    setSelected(selected === id ? null : id);
  };

  const result = useSelector((state) => state.cartData);
  const wishlist = useSelector((state) => state.wishlistData);
  const dispatch = useDispatch();

  // ======
  // navbar
  const [navData, setNavData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    // const storedNavData = localStorage.getItem("navData");

    // if (storedNavData) {
    //   setNavData(JSON.parse(storedNavData));
    // } else {
    // Fetch data from API if not available in local storage
    axios
      .get(
        `${baseUrl}/menu`
      )
      .then((res) => {
        // localStorage.setItem("navData", JSON.stringify(res.data.data));
        setNavData(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);

  // suggestion Api
  const [suggestion, setSuggestion] = useState();
  const [suggestionData, setSuggestionData] = useState([]);

  const handleSuggestion = (value) => {
    setSuggestion(value);
  };
  useEffect(() => {
    const delayedSuggestion = debounce(() => {
      axios
        .get(
          `${baseUrl}/search-suggestion?q=${suggestion}`
        )
        .then((res) => {
          setSuggestionData(res.data.data);
        })
        .catch(() => {
          console.log("API error");
        });
    }, 500); // Adjust the debounce delay according to your preference

    delayedSuggestion(); // Initial call to avoid empty suggestion on component mount

    return delayedSuggestion.cancel; // Cleanup function
  }, [suggestion]);
  //search api
  const [searchValue, setSearchValue] = useState("");
  function handleSearch(value) {
    setShowSuggestionHeader(true);

    setSearchValue(value);
    setSearching(value);

    if (value.length < 1) {
      setShowSuggestionHeader(false);
    } else {
      setShowSuggestionHeader(true);
    }
  }
  useEffect(() => {
    const delayedSearch = debounce(() => {
      axios
        .get(
          `${baseUrl}/search?q=${searching}`
        )
        .then((res) => {
          setSearchData(res.data.data);
        })
        .catch(() => {
          console.log("API error");
        });
    }, 500); // Adjust the debounce delay according to your preference

    delayedSearch(); // Initial call to avoid empty search on component mount

    return delayedSearch.cancel; // Cleanup function
  }, [searchValue, searching]);
  // search end here

  const [hovered, setHovered] = useState(false);
  const [wishHovered, setWishHovered] = useState(false);
  const [bag, setBag] = useState(false);
  function handleWish() {
    setWishHovered(true);
  }
  function handleMouse() {
    setHovered(true);
  }
  function handleBag() {
    setBag(true);
  }
  // =========
  const updateSearchValue = (value) => {
    setSearchValue(value);
  };

  const userId = localStorage.getItem("formData");

  return (
    <>
      <header className="header">
        <div className="container">
        <div
            className={`header-top ${
              location.pathname == "/check_out" ||
              location.pathname == "/payment"               
                ? "active"
                : ""
            } ${location.pathname == "/success" ? "success-active" : ""}`}
          >
            <div className="header-contact-us ">
              <Link to="/contact-us">Contact Us <span><img src="./images/call.svg" alt="" /></span></Link>
            </div>

            <div className="header-logo">
              <Link to="/">
                <img src={samaLogo} alt="samaLogo" />
              </Link>
            </div>

            <div className="header-icons">
              <div className="bell-icon">
                <Link to="#">
                  <BsFillBellFill />
                  <span>01</span>
                </Link>
              </div>
              <div className="search-icon">
                <Link to="#" onClick={ToggleClass}>
                  <AiOutlineSearch />
                </Link>
                <input
                  className={active ? "search-open" : "search-close"}
                  type="text"
                  placeholder="Search Product"
                  onClick={() => {
                    setShowSuggestion(false);
                  }}
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyUp={(e) => handleSuggestion(e.target.value)}
                  value={searching}
                />
                <div
                  className="show-suggestion-page"
                  onMouseLeave={() => setShowSuggestionHeader(false)}
                >
                  {showSuggestionHeader && (
                    <SearchSuggestion
                      suggestionData={suggestionData}
                      suggestion={suggestion}
                    />
                  )}
                </div>
              </div>
              <div className="bag-icon" onMouseOver={handleBag}>
                <Link to="javascript:void(0)" className="bag-msgheader">
                  {userId && cartDetails?.length > 0 ? (
                    <span className="msg-box">{cartDetails?.length}</span>
                  ) : !userId && result.length > 0 ? (
                    <span className="msg-box">{result?.length}</span>
                  ) : null}

                  <Link to={"/cart"}>
                    <BsBag />
                  </Link>

                  <CartHover />
                </Link>
              </div>

              <div className="header-heart-icon" onMouseOver={handleWish}>
                <Link to="javascript:void(0)" className="whishlist-msg">
                  {userId && wishListDataBase.length > 0 ? (
                    <span className="msg-box">{wishListDataBase?.length}</span>
                  ) : !userId && wishlist.length > 0 ? (
                    <span className="msg-box">{wishlist?.length}</span>
                  ) : null}

                  <Link to={"/wishlist"}>
                    <AiOutlineHeart />
                  </Link>

                  <WishlistHover />
                </Link>
              </div>
              <div className="user-icon" onMouseOver={handleMouse}>
                <Link to="#">
                  <Link to={userId ? "/accounts" : "/login"}>
                    <AiOutlineUser />
                  </Link>
                  {hovered && userId ? <OrderHistory /> : <Account />}
                </Link>
              </div>
            </div>
          </div>

          <nav className="nav">
            <ul>
              {navData.map((res) => {
                var urlslug = "";
                return (
                  <>
                    <li>
                      <Link to={res.slug}>{res.name}</Link>
                      <div className="engagement-ring flex">
                        {res.categories?.map((catRes) => {
                          if (catRes.slug == "shop-by-shape") {
                            urlslug = "shape";
                          } else if (catRes.slug == "engagement-ring-styles") {
                            urlslug = "style";
                          } else if (catRes.slug == "natural-diamonds") {
                            urlslug = "shape-diamond";
                          } else {
                            urlslug = "style";
                          }

                          return (
                            <>
                              <ul>
                                <li>
                                  <NavLink to="#">{catRes.name}</NavLink>
                                </li>

                                {catRes.subcategories.map((subRes) => {
                                  return (
                                    <>
                                      <li>
                                        {subRes.image ? (
                                          <i>
                                            <img src={subRes.image} alt="" />
                                          </i>
                                        ) : null}
                                        <NavLink
                                          to={`${res.slug}/${subRes.alias}`}
                                        >
                                          {/* {console.log("sssssssssssssssss",`?${urlslug}=${subRes.slug}`)} */}
                                          {subRes.name}
                                        </NavLink>
                                      </li>
                                    </>
                                  );
                                })}
                              </ul>
                            </>
                          );
                        })}
                      </div>
                    </li>
                  </>
                );
              })}
            </ul>
          </nav>
          {/* ===============================================header mobile device start ===================================================== */}

          <div
            className={
              active ? "mobile-nav-main nav-mobile" : "res-nav-main nav-mobile"
            }
          >
            <div
              onClick={ToggleClass}
              className={
                active ? "navabar-icons close-icons" : "navabar-icons2"
              }
            >
              <AiOutlineClose className="icon" />
            </div>
            <div
              onClick={ToggleClass}
              className={
                active ? "navabar-icons2 " : "navabar-icons HamburgerMenu-icons"
              }
            >
              <GiHamburgerMenu className="icon" />
            </div>

            <nav className={active ? "mobile-nav allnav" : "res-nav allnav"}>
              <div
                className={
                  selected
                    ? "contents-show-main allnav-menu"
                    : "contents-main allnav-menu"
                }
              >
                <ul>
                  {navData.map((item) => (
                    <li
                      key={item.id}
                      className="title"
                      onClick={() => toggle(item.id)}
                    >
                      <NavLink to="javascript:void(0)">{item.name}</NavLink>
                      <span>
                        {selected === item.id ? <BiUpArrow /> : <BiDownArrow />}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {navData.map((item) => (
                <div
                  key={item.id}
                  className={
                    selected === item.id
                      ? "content-show main-content"
                      : "content main-content"
                  }
                >
                  <ul>
                    <li className="title" onClick={() => toggle(item.id)}>
                      <NavLink to="javascript:void(0)">{item.name}</NavLink>
                      <span>
                        {selected === item.id ? <BiUpArrow /> : <BiDownArrow />}
                      </span>
                    </li>
                    {item.categories && (
                      <div className="engagement-ring flex">
                        {item.categories.map((catItem, index) => (
                          <ul>
                            <li key={index}>
                              <NavLink
                                to="javascript:void(0)"
                                onClick={ToggleClass}
                              >
                                {catItem.name}
                              </NavLink>
                            </li>
                            {catItem.subcategories.map((subItem, index) => {
                              return (
                                <>
                                  <li key={index}>
                                    {subItem.image ? (
                                      <i>
                                        <img src={subItem.image} alt="" />
                                      </i>
                                    ) : null}
                                    <NavLink
                                      to={`${item.slug}/${subItem.alias}`}
                                    >
                                      {/* {console.log("sssssssssssssssss",`?${urlslug}=${subRes.slug}`)} */}
                                      {subItem.name}
                                    </NavLink>
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        ))}
                      </div>
                    )}
                  </ul>
                </div>
              ))}
            </nav>
            <div className="nav-mobile-logo">
              <Link to="/">
                <img src={samaLogo} alt="samaLogo" />
              </Link>
            </div>
            <div className="nav-mobile-icons">
              <div className="call-icon">
                <Link to="/contact-us">
                  <BiPhoneCall />
                </Link>
              </div>

              <div className="bag-icon">
                <Link to={userId ? "/cart-page" : "/cart"}>
                  <BsBag />
                </Link>
              </div>
            </div>
            <div className="header-search">
              <form action="#">
                <input
                  className={active ? "search-open" : "search-close"}
                  type="text"
                  placeholder="Search Product"
                  onClick={() => {
                    setShowSuggestion(false);
                  }}
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyUp={(e) => handleSuggestion(e.target.value)}
                  value={searching}
                />
                {showSuggestionHeader && (
                  <SearchSuggestion
                    suggestionData={suggestionData}
                    suggestion={suggestion}
                  />
                )}
              </form>
              <div className="search-icon">
                <Link to="/">
                  <AiOutlineSearch />
                </Link>
              </div>
            </div>
          </div>
          {/* =============================================== header mobile device start ===================================================== */}
        </div>
      </header>
    </>
  );
};
export default Header;
