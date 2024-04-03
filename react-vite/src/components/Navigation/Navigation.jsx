import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import Search from "../Search/SearchBar/Search";

function Navigation() {
  const user = useSelector((state) => state.session.user);

  const projectLink = (
    <div>
      <NavLink to="/projects/new" className="new-project">
        Start a Project
      </NavLink>
    </div>
  );

  const empty = <div className="empty"></div>;

  const newProjectDiv = user ? projectLink : empty;

  return (
    <ul className="nav-container">
      <li className="logo-li">
        <NavLink to="/" className="logo">
          LaunchPad
        </NavLink>
      </li>
      <li className="search-li">
        <Search />
      </li>
      <li className="new-project-button-li">
        <div className="new-project-menu">{newProjectDiv}</div>
      </li>
      <li className="button-container">
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
