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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const hasProfileImg = user?.profile_img;
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
    navigate("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {hasProfileImg ? (
        <img
          className="profile-image"
          src={user?.profile_img}
          alt="Profile Image"
          onClick={toggleMenu}
        />
      ) : (
        <img
          className="profile-image"
          src="https://launch-pad-group-project.s3.us-west-1.amazonaws.com/48-512.png"
          alt="Profile Image"
          onClick={toggleMenu}
        />
      )}

      {showMenu && (
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <li className="text">{user.username}</li>
              <li className="text-email">{user.email}</li>
              <div className="seperator"></div>
              <ul className="manage-projects">
                
                  <NavLink
                    to="/projects/created-projects"
                    className="manage-nav"
                    onClick={toggleMenu}
                  >
                    Created Projects
                  </NavLink>
              
                
                  <NavLink
                    to="/projects/backed-projects"
                    className="manage-nav extra"
                    onClick={toggleMenu}
                  >
                    Backed Projects
                  </NavLink>
               
              </ul>
              <li className="logout-button">
                <button onClick={logout} className="lo-button">
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <div className="login-logout">
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
            </div>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
