import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import { DeleteProjectModal } from "../DeleteProjectModal/DeleteProjectModal";
import "./projectListItem.css";
import ProgressBar from "../../ProgressBar/ProgressBar";

// backed projects, liked projects, categories page, created projects
export const ProjectListItem = ({ project }) => {
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const msDay = 60 * 60 * 24 * 1000;
  const daysToGo = (new Date(project.end_date) - new Date()) / msDay;

  let daysLeft = Math.floor(daysToGo);

  let hoursLeft;
  if (daysLeft < 1) {
    hoursLeft = Math.round(daysToGo * 24);
  }
  const fundingPercentage = Math.round(
    project.totalFunded / project.fundingGoal
  );
  const categoryName = project.category.replace("-", " & ");

  let isOwner = project.owner.id == user?.id;

  return (
    <li className="project-container">
      <div className="card-project-image">
        <Link to={`/projects/${project.id}`}>
          <img
            src={`${project.coverImage}`}
            alt="cover image of project"
            className="project-image"
          />
        </Link>
      </div>
      <div className="card-text-div">
        <div className="card-titles">
          <Link to={`/projects/${project.id}`}>
            <h2>{project.title}</h2>
          </Link>
          <p>{project.subtitle}</p>
          <p>
            by{" "}
            <span>
              {project.owner.first_name} {project.owner.last_name}
            </span>
          </p>
        </div>
        {/* <div className="card-funding-progress">{project.fundingGoal} {project.totalFunded}</div> */}
        <ProgressBar project={project} />
        <div className="below-progress-bar"> 
        

        <div className="card-stats">
          <p className="green">${project.totalFunded} pledged</p>
          <p>{fundingPercentage}% funded</p>
          {daysLeft == 0 && <p>{hoursLeft} hours left!</p>}
          {daysLeft > 0 && <p>{daysLeft} days left</p>}
        </div>
          </div>
      </div>
      <div className="project-list-item-cat-loc">
        <span>
          <Link to={`/category/${project.category}`}>{categoryName}</Link>
        </span>
        <span>
          <span>
            <FaMapMarkerAlt />
          </span>
          <span>{project.location}</span>
        </span>
      </div>
      {isOwner && (
        <div className="card-owner-buttons">
          <button onClick={() => navigate(`/projects/${project.id}/edit`)}>
            Edit project
          </button>
          <button
            onClick={() => navigate(`/projects/${project.id}/rewards/new`)}
          >
            Add Reward
          </button>
          <OpenModalButton
            buttonText="Delete"
            modalComponent={<DeleteProjectModal project={project} />}
          />
        </div>
      )}
    </li>
  );
};
