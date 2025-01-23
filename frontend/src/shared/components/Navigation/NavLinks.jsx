

import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { PlaceShareContext } from "../../context/PlaceShareContextProvider";
import "./NavLinks.css";
const NavLinks = (props) =>
{
  const { isLoggedIn, logout } = useContext(PlaceShareContext);
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
          <NavLink to={`/${props.id}/places`}>My Places</NavLink>
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
