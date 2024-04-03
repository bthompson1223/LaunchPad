import { NavLink } from "react-router-dom"

const CategoriesNav = () => {

  return (
  <nav className="category-nav">
    <NavLink to="/categories/All">All</NavLink>
    <NavLink to="/categories/Arts">Arts</NavLink>
    <NavLink to="/categories/Comics-Illustration">
      Comics & Illustration
    </NavLink>
    <NavLink to="/categories/Design-Tech">Design & Tech</NavLink>
    <NavLink to="/categories/Film">Film</NavLink>
    <NavLink to="/categories/Food-Craft">Food & Craft</NavLink>
    <NavLink to="/categories/Games">Games</NavLink>
    <NavLink to="/categories/Music">Music</NavLink>
    <NavLink to="/categories/Publishing">Publishing</NavLink>
  </nav>)
}

export default CategoriesNav;