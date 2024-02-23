import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import './FeaturedProject.css'
import ProgressBar from "../../ProgressBar/ProgressBar";


// backed projects, liked projects, categories page, created projects
export const FeaturedProject = ({ project }) => {
  const msDay = 60 * 60 * 24 * 1000;
  const daysToGo = (new Date(project.end_date) - new Date()) / msDay;

  let daysLeft = Math.floor(daysToGo);

  let hoursLeft;
  if (daysLeft < 1) {
    hoursLeft = Math.round(daysToGo * 24);
  }
  const fundingPercentage = Math.round(project.totalFunded / project.fundingGoal);
  const categoryName = project.category.replace("-", " & ");

  return (
    <li className="featured-project-container">
        <div className="card-project-image">
      <Link to={`/projects/${project.id}`}>
          <img
            src={`${project.coverImage}`}
            alt="cover image of project"
            className="project-image"
          />
      </Link>
        </div>
      <ProgressBar project={project}/>
      <div className="card-text-div">
        <div className="card-titles">
          <Link to={`/projects/${project.id}`}>
            <h2>{project.title}</h2>
            <p>{project.subtitle}</p>
          </Link>
          <p>
            by{" "}
            <span>
              {project.owner.first_name} {project.owner.last_name}
            </span>
          </p>
        </div>

        <div className="card-stats">
          <p>${project.totalFunded} pledged</p>
          <p>{fundingPercentage}% funded</p>
          {daysLeft == 0 && <p>{hoursLeft} hours left!</p>}
          {daysLeft > 0 && <p>{daysLeft} days left</p>}
          <Link to={`/category/${project.category}`}>{categoryName}</Link>
          <span>
            <span>
              <FaMapMarkerAlt />
            </span>
            {project.location}
          </span>
        </div>
      </div>
    </li>
  );
};
