

import { NavLink } from "react-router-dom";
import { usePlaceShare } from "../../hooks/usePlaceShare";
import "./NavLinks.css";
const NavLinks = () =>
{
  const { isLoggedIn, logout, userId } = usePlaceShare();
  let navLinks;
  if (!isLoggedIn) {
    navLinks = (
      <ul className="nav-links">
        <li>
          <NavLink to="/">All Users</NavLink>
        </li>

        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      </ul>
    );
  } else {
    navLinks = (
      <ul className="nav-links">
        <li>
          <NavLink to="/">All Users</NavLink>
        </li>
        <li>
          <NavLink to={`/${userId}/places`}>My Places</NavLink>
        </li>
        <li>
          <NavLink to="/places/new">Add Places</NavLink>
        </li>
        <li>
          <NavLink onClick={() => logout()} to="/auth">
            Sign-Out
          </NavLink>

        </li>
      </ul>
    );
  }
  return navLinks;
};

export default NavLinks;
