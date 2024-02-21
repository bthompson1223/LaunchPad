import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useNavigate } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu} className="menu">
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <li className="text">{user.username}</li>
              <li className="text-email">{user.email}</li>
              <ul className="manage-projects">
                <li>
                  <NavLink
                    to="/projects/created-projects"
                    className="manage-nav"
                    onClick={toggleMenu}
                  >
                    Manage Created Projects
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/projects/backed-projects"
                    className="manage-nav extra"
                    onClick={toggleMenu}
                  >
                    Manage Backings
                  </NavLink>
                </li>
              </ul>
              <li className="logout-button">
                <button onClick={logout} className="lo-button">
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
