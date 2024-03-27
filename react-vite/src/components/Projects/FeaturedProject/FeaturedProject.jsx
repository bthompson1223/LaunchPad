import { Link } from "react-router-dom";
import ProgressBar from "../../ProgressBar/ProgressBar";
import "./FeaturedProject.css";

export const FeaturedProject = ({ project }) => {

  return (
    <li className="featured-project-container">
        <div className="featured-project-image-div">
      <Link to={`/projects/${project.id}`}>
          <img
            src={`${project.coverImage}`}
            alt="cover image of project"
            className="featured-project-image"
          />
      </Link>
        </div>
        <ProgressBar project={project} />
        <div className="featured-project-text-div">
          <Link >
          <div className="featured-project-title">
            <h2 className="underline">{project.title}</h2>
          </div>
          <div className="featured-project-subtitle">
            <p>{project.subtitle}</p>
          </div>
          </Link>
        </div>
      <div className="featured-project-author">
        <p>
          by{" "}
          <span>
            {project.owner.first_name} {project.owner.last_name}
          </span>
        </p>
      </div>
    </li>
  );
};


