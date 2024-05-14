import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { productSearch } from "../../redux/productAction";

export const Header = () => {
  const result = useSelector((state) => state.cartData);
  const dispatch = useDispatch();
  console.warn("data in header", result);
  return (
    <header>
      <div className="header">
        <Link to="/">
          <h1 className="logo">E-Comm</h1>
        </Link>
        <div className="search-box">
          <input
            type="text"
            onChange={(event) => dispatch(productSearch(event.target.value))}
            placeholder="Search Product"
          />
        </div>
        <Link to="/cart">
          <div className="cart-div">
            <span>{result.length}</span>
            <img
              src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
              alt=""
            />
          </div>
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/">Start with a Setting</NavLink>
          </li>
          <li>
            <NavLink to="/DiemondPageTabe1">Start with a Diamond</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
