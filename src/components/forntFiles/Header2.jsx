import { Link, NavLink } from "react-router-dom";
// import "../Style.css";
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
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productSearch } from "../../redux/productAction";
import axios from "axios";

const Header = () => {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(null);

  const ToggleClass = () => {
    setActive(!active);
  };

  const toggle = (id) => {
    setSelected(selected === id ? null : id);
  };

  // navbar
  const [navData, setNavData] = useState([]);

  useEffect(() => {
    const storedNavData = localStorage.getItem("navData");

    if (storedNavData) {
      setNavData(JSON.parse(storedNavData));
    } else {
      // Fetch data from API if not available in local storage
      axios
        .get(
          "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/v1/menu"
        )
        .then((res) => {
          localStorage.setItem("navData", JSON.stringify(res.data.data));
          setNavData(res.data.data);
        })
        .catch(() => {
          console.log("API error");
        });
    }
  }, []);
  return (
    <>
      <header className="header">
        <div className="container">
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
                      <NavLink to="/">{item.name}</NavLink>
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
                      <NavLink to="/">{item.name}</NavLink>
                      <span>
                        {selected === item.id ? <BiUpArrow /> : <BiDownArrow />}
                      </span>
                    </li>
                    {item.categories && (
                      <div className="engagement-ring flex">
                        {item.categories.map((catItem, index) => (
                          <ul>
                            <li key={index}>
                              <NavLink to="#" onClick={ToggleClass}>
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
                                    <NavLink to="#" onClick={ToggleClass}>
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
                <Link to="/">
                  <BiPhoneCall />
                </Link>
              </div>

              <div className="bag-icon">
                <Link to="/">
                  <BsBag />
                </Link>
              </div>
            </div>
            <div className="header-search">
              <form action="#">
                <input type="search" placeholder="Search" />
              </form>
              <div className="search-icon">
                <Link to="/">
                  <AiOutlineSearch />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
