import ProjectList from "../Projects/ProjectList/projectList";
import CategoriesNav from "./CategoriesNav";
import "./categories.css";

const Categories = () => {
  return (
    <div className="categories-container">
      <div>
        <CategoriesNav />
      </div>
      <div>
        <ProjectList />
      </div>
    </div>
  );
};

export default Categories;
