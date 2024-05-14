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
import { GiGlobeRing, GiHamburgerMenu } from "react-icons/gi";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { useState } from "react";

export const Header = () => {
  const [active, setActive] = useState(false);

  const ToggleClass = () => {
    setActive(!active);
  };

  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      setSelected(null);
    } else {
      setSelected(i);
    }
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-top">
            <div className="header-contact-us">
              <Link className="button" to="/">
                Contact Us
              </Link>
            </div>
            <div className="header-logo">
              <Link to="/">
                <img src={samaLogo} alt="samaLogo" />
              </Link>
            </div>

            <div className="header-icons">
              <div className="bell-icon">
                <Link to="/">
                  <BsFillBellFill />
                  <span>01</span>
                </Link>
              </div>
              <div className="search-icon">
                <Link to="/">
                  <AiOutlineSearch />
                </Link>
              </div>
              <div className="bag-icon">
                <Link to="/">
                  <BsBag />
                </Link>
              </div>
              <div className="heart-icon">
                <Link to="/">
                  <AiOutlineHeart />
                </Link>
              </div>
              <div className="user-icon">
                <Link to="/">
                  <AiOutlineUser />
                </Link>
              </div>
            </div>
          </div>

          <nav className="nav">
            <ul>
              <li>
                <NavLink to="/">ENGAGEMENT RINGS</NavLink>
                <div className="engagement-ring flex">
                  <ul>
                    <li>
                      <NavLink to="/">DESIGN YOUR OWN ENGAGEMENT RING</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                  </ul>

                  <ul>
                    <li>
                      <NavLink to="/">DESIGN YOUR OWN ENGAGEMENT RING</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                  </ul>

                  <ul>
                    <li>
                      <NavLink to="/">DESIGN YOUR OWN ENGAGEMENT RING</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                  </ul>

                  <ul className="nav-img">
                    <li>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2F9c4f5f89475d409189b25aba7233c258"
                        alt=""
                      />
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <NavLink to="/"> WEDDING RINGS</NavLink>
                <div className="engagement-ring flex">
                  <ul>
                    <li>
                      <NavLink to="/">DESIGN YOUR OWN ENGAGEMENT RING</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                  </ul>

                  <ul>
                    <li>
                      <NavLink to="/">DESIGN YOUR OWN ENGAGEMENT RING</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                  </ul>

                  <ul>
                    <li>
                      <NavLink to="/">DESIGN YOUR OWN ENGAGEMENT RING</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                  </ul>

                  <ul className="nav-img">
                    <li>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2F9c4f5f89475d409189b25aba7233c258"
                        alt=""
                      />
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <NavLink to="/">DESIGN YOUR OWN ENGAGEMENT RING</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <NavLink to="/">DIAMONDS</NavLink>
                <div className="engagement-ring flex">
                  <ul>
                    <li>
                      <NavLink to="/">DESIGN YOUR OWN ENGAGEMENT RING</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                  </ul>

                  <ul>
                    <li>
                      <NavLink to="/">DESIGN YOUR OWN ENGAGEMENT RING</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                  </ul>

                  <ul>
                    <li>
                      <NavLink to="/">DESIGN YOUR OWN ENGAGEMENT RING</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                  </ul>

                  <ul className="nav-img">
                    <li>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2F9c4f5f89475d409189b25aba7233c258"
                        alt=""
                      />
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <NavLink to="/">GEMSTONES</NavLink>
                <div className="engagement-ring flex">
                  <ul>
                    <li>
                      <NavLink to="/">DESIGN YOUR OWN ENGAGEMENT RING</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                  </ul>

                  <ul>
                    <li>
                      <NavLink to="/">DESIGN YOUR OWN ENGAGEMENT RING</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                  </ul>

                  <ul>
                    <li>
                      <NavLink to="/">DESIGN YOUR OWN ENGAGEMENT RING</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                  </ul>

                  <ul className="nav-img">
                    <li>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2F9c4f5f89475d409189b25aba7233c258"
                        alt=""
                      />
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <NavLink to="/">ABOUT</NavLink>
                <div className="engagement-ring flex">
                  <ul>
                    <li>
                      <NavLink to="/">DESIGN YOUR OWN ENGAGEMENT RING</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                  </ul>

                  <ul>
                    <li>
                      <NavLink to="/">DESIGN YOUR OWN ENGAGEMENT RING</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                  </ul>

                  <ul>
                    <li>
                      <NavLink to="/">DESIGN YOUR OWN ENGAGEMENT RING</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                    <li>
                      <GiGlobeRing />
                      <NavLink to="/">Start with a setting</NavLink>
                    </li>
                  </ul>

                  <ul className="nav-img">
                    <li>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2F9c4f5f89475d409189b25aba7233c258"
                        alt=""
                      />
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>

          <div
            className={
              active ? "mobile-nav-main nav-mobile" : "res-nav-main nav-mobile"
            }
          >
            <div className="nav-mobile-logo">
              <Link to="/">
                <img src={samaLogo} alt="samaLogo" />
              </Link>
            </div>
            <div className="nav-mobile-icons">
              <div className="bell-icon">
                <Link to="/">
                  <BsFillBellFill />
                  <span>01</span>
                </Link>
              </div>
              <div className="search-icon">
                <Link to="/">
                  <AiOutlineSearch />
                </Link>
              </div>
              <div className="bag-icon">
                <Link to="/">
                  <BsBag />
                </Link>
              </div>
              <div className="heart-icon">
                <Link to="/">
                  <AiOutlineHeart />
                </Link>
              </div>
              <div className="user-icon">
                <Link to="/">
                  <AiOutlineUser />
                </Link>
              </div>
            </div>
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
            {/* ===============================================mobile device===================================================== */}
            <nav className={active ? "mobile-nav allnav" : "res-nav allnav"}>
              <div className={selected ? "contents-show-main allnav-menu" : "contents-main allnav-menu"}>
                <ul>
                  <li className=" title" onClick={() => toggle(1)}>
                    <NavLink to="/">ENGAGEMENT RINGS</NavLink>
                    <span>
                      {selected === 1 ? <BiUpArrow /> : <BiDownArrow />}
                    </span>
                  </li>

                  <li className=" title" onClick={() => toggle(2)}>
                    <NavLink to="/">WEDDING RINGS</NavLink>
                    <span>
                      {selected === 2 ? <BiUpArrow /> : <BiDownArrow />}
                    </span>
                  </li>

                  <li className=" title" onClick={() => toggle(3)}>
                    <NavLink to="/">DIAMONDS</NavLink>
                    <span>
                      {selected === 3 ? <BiUpArrow /> : <BiDownArrow />}
                    </span>
                  </li>

                  <li className=" title" onClick={() => toggle(4)}>
                    <NavLink to="/">GEMSTONES</NavLink>
                    <span>
                      {selected === 4 ? <BiUpArrow /> : <BiDownArrow />}
                    </span>
                  </li>

                  <li className=" title" onClick={() => toggle(5)}>
                    <NavLink to="/">ABOUT</NavLink>
                    <span>
                      {selected === 5 ? <BiUpArrow /> : <BiDownArrow />}
                    </span>
                  </li>
                  </ul>
                  </div>
                  <div
                    className={
                      selected === 1
                        ? "content-show main-content"
                        : "content main-content"
                    }
                  >
                    <ul>
                      
                    <li className=" title" onClick={() => toggle(1)}>
                    <NavLink to="/">ENGAGEMENT RINGS</NavLink>
                    <span>
                      {selected === 1 ? <BiUpArrow /> : <BiDownArrow />}
                    </span>
                  </li>
                      <li>
                        <NavLink to="/">name1</NavLink>
                      </li>
                      <li>
                        <NavLink to="/">name1</NavLink>
                      </li>
                      <li>
                        <NavLink to="/">name1</NavLink>
                      </li>
                      <li>
                        <NavLink to="/">name1</NavLink>
                      </li>
                    </ul>
                  </div>

                  <div
                    className={
                      selected === 2
                        ? "content-show main-content"
                        : "content main-content"
                    }
                  >
                    <ul>
                    <li className=" title" onClick={() => toggle(2)}>
                    <NavLink to="/">WEDDING RINGS</NavLink>
                    <span>
                      {selected === 2 ? <BiUpArrow /> : <BiDownArrow />}
                    </span>
                  </li>
                      <li>
                        <NavLink to="/">name2</NavLink>
                      </li>
                      <li>
                        <NavLink to="/">name1</NavLink>
                      </li>
                      <li>
                        <NavLink to="/">name1</NavLink>
                      </li>
                      <li>
                        <NavLink to="/">name1</NavLink>
                      </li>
                    </ul>
                  </div>

                  <div
                    className={
                      selected === 3
                        ? "content-show main-content"
                        : "content main-content"
                    }
                  >
                    <ul>
                    <li className=" title" onClick={() => toggle(3)}>
                    <NavLink to="/">DIAMONDS</NavLink>
                    <span>
                      {selected === 3 ? <BiUpArrow /> : <BiDownArrow />}
                    </span>
                  </li>
                      <li>
                        <NavLink to="/">name3</NavLink>
                      </li>
                      <li>
                        <NavLink to="/">name1</NavLink>
                      </li>
                      <li>
                        <NavLink to="/">name1</NavLink>
                      </li>
                      <li>
                        <NavLink to="/">name1</NavLink>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={
                      selected === 4
                        ? "content-show main-content"
                        : "content main-content"
                    }
                  >
                    <ul>
                    <li className=" title" onClick={() => toggle(4)}>
                    <NavLink to="/">GEMSTONES</NavLink>
                    <span>
                      {selected === 4 ? <BiUpArrow /> : <BiDownArrow />}
                    </span>
                  </li>
                      <li>
                        <NavLink to="/">name4</NavLink>
                      </li>
                      <li>
                        <NavLink to="/">name1</NavLink>
                      </li>
                      <li>
                        <NavLink to="/">name1</NavLink>
                      </li>
                      <li>
                        <NavLink to="/">name1</NavLink>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={
                      selected === 5
                        ? "content-show main-content"
                        : "content main-content"
                    }
                  >
                    <ul>
                    <li className=" title" onClick={() => toggle(5)}>
                    <NavLink to="/">ABOUT</NavLink>
                    <span>
                      {selected === 5 ? <BiUpArrow /> : <BiDownArrow />}
                    </span>
                  </li>
                      <li>
                        <NavLink to="/">name5</NavLink>
                      </li>
                      <li>
                        <NavLink to="/">name5</NavLink>
                      </li>
                      <li>
                        <NavLink to="/">name1</NavLink>
                      </li>
                      <li>
                        <NavLink to="/">name1</NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className="nav-mobile-contact-us">
                    <Link className="button" to="/">
                      Contact Us
                    </Link>
                  </div>
                
              
            </nav>

            {/* ===============================================mobile device===================================================== */}
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
