import { NavLink } from "react-router-dom"

const CategoriesNav = () => {

  return (
  <nav className="category-nav">
    <NavLink to="/categories/all">All</NavLink>
    <NavLink to="/categories/arts">Arts</NavLink>
    <NavLink to="/categories/comics-illustration">
      Comics & Illustration
    </NavLink>
    <NavLink to="/categories/design-tech">Design & Tech</NavLink>
    <NavLink to="/categories/film">Film</NavLink>
    <NavLink to="/categories/food-craft">Food & Craft</NavLink>
    <NavLink to="/categories/games">Games</NavLink>
    <NavLink to="/categories/music">Music</NavLink>
    <NavLink to="/categories/publishing">Publishing</NavLink>
  </nav>)
}

export default CategoriesNav;