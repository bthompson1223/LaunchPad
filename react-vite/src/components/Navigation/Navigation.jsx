import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  const user = useSelector((state) => state.session.user);

  const projectLink = (
    <div>
      <NavLink to="/projects/new" className="new-project">
        Create a Project
      </NavLink>
    </div>
  );

  const empty = <div className="empty"></div>;

  const newProjectDiv = user ? projectLink : empty;

  return (
    <ul className="nav-container">
      <li>
        <div className="new-project-menu">{newProjectDiv}</div>
      </li>
      <li>
        <NavLink to="/" className="logo">
          LaunchPad
        </NavLink>
      </li>

      <li className="button-container">
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
