import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import { DeleteProjectModal } from "../DeleteProjectModal/DeleteProjectModal";
import "./projectListItem.css";

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
  const fundingPercentage = project.totalFunded / project.fundingGoal;
  const categoryName = project.category.replace("-", " & ");

  let isOwner = project.owner.id == user?.id;

  return (
    <li className="project-container">
      <Link to={`/projects/${project.id}`}>
        <div className="card-project-image">
          <img
            src={`${project.coverImage}`}
            alt="cover image of project"
            className="project-image"
          />
        </div>
      </Link>
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
        {/* <div className="card-funding-progress">{project.fundingGoal} {project.totalFunded}</div> */}

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

        {isOwner && (
          <div className="card-owner-buttons">
            <button onClick={() => navigate(`/projects/${project.id}/edit`)}>
              Edit project
            </button>
            <button
              onClick={() => navigate(`/projects/${project.id}/rewards/new`)}
            >
              Add a Reward
            </button>
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteProjectModal project={project} />}
            />
          </div>
        )}
      </div>
    </li>
  );
};
