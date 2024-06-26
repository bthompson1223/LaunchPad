import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaRegCompass } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { thunkGetOneProject } from "../../../redux/project";
import { thunkGetLikes } from "../../../redux/likes";
import { Story } from "./StorySection";
import { Risks } from "./RiskSection";
import { Comments } from "./CommentSection";
import { DeleteProjectModal } from "../DeleteProjectModal/DeleteProjectModal";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import ProgressBar from "../../ProgressBar/ProgressBar";
import "./ProjectDetail.css";


export const ProjectDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const project = useSelector((state) => state.projects[projectId]);
  const user = useSelector((state) => state.session.user);
  const [topic, setTopic] = useState("story");
  const likesObj = useSelector((state) => state.likes);

  const formatAmount = (amount) => {
    const formatted = amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatted;
  };

  useEffect(() => {
    dispatch(thunkGetOneProject(projectId));
    dispatch(thunkGetLikes(projectId));
  }, [dispatch, projectId]);

  if (!project) return null;

  const msDay = 60 * 60 * 24 * 1000;
  const daysToGo = (new Date(project.end_date) - new Date()) / msDay;

  let daysLeft = Math.floor(daysToGo);

  let hoursLeft;
  if (daysLeft < 1) {
    hoursLeft = Math.round(daysToGo * 24);
  }

  let isOwner = false;
  if (user?.id == project.owner.id) {
    isOwner = true;
  }

  return (
    <div>
      <section className="project-detail-container">
        <div className="project-detail-section">
          <div className="project-detail-titles">
            <h1>{project.title}</h1>
            <p>{project.subtitle}</p>
          </div>

          {/* <div className="project-detail"> */}
          <div className="project-detail-image">
            <img src={project.coverImage} alt="Cover image for the project" />
          </div>

          <div className="project-detail-info">
            <ProgressBar project={project} />
            <div className="project-detail-stats">
              <div>
                <h2 id="project-total-funded">
                  {formatAmount(project.totalFunded)}
                </h2>
                <span>pledged of {formatAmount(project.fundingGoal)} goal</span>
              </div>

              <div>
                <h2>{project.numOfBackers}</h2>
                <span>pledges</span>
              </div>

              <div>
                {daysLeft == 0 && (
                  <>
                    <h2>{hoursLeft}</h2> <span>hours left!</span>
                  </>
                )}
                {daysLeft > 0 && (
                  <>
                    <h2>{daysLeft}</h2> <span>days to go</span>
                  </>
                )}
              </div>

            </div>
            {!isOwner && (
              <div className="project-detail-buttons">
                <button
                  id="back-project-button"
                  onClick={() => navigate(`/projects/${project.id}/rewards`)}
                >
                  Back this project
                </button>
              </div>
            )}
            {isOwner && (
              <div className="project-detail-buttons">
                <button
                  onClick={() => navigate(`/projects/${project.id}/edit`)}
                >
                  Edit project
                </button>
                <button
                  onClick={() => navigate(`/projects/${project.id}/rewards`)}
                >
                  View Rewards
                </button>
                <button
                  onClick={() =>
                    navigate(`/projects/${project.id}/rewards/new`)
                  }
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
          {/* </div> */}
          <div className="project-detail-category-location">
            <div className="project-detail-category-location-inner">

              <span>
                <span className="icon-span">
                  <FaRegCompass />
                </span>
                <Link to={`/categories/${project.category}`}>
                  {project.category}
                </Link>
              </span>
              <span>
                <span className="icon-span">
                  <FaMapMarkerAlt />
                </span>
                {project.location}
              </span>
            </div>
          </div>
        </div>
      </section>
      <nav className="project-detail-nav">
        <div className="project-detail-sub-nav-links">
          <span
            className={topic == "story" ? "active" : null}
            onClick={() => setTopic("story")}
          >
            Story
          </span>
          <span
            className={topic == "risks" ? "active" : null}
            onClick={() => setTopic("risks")}
          >
            Risks
          </span>
          <span
            className={topic == "comments" ? "active" : null}
            onClick={() => setTopic("comments")}
          >
            Comments
          </span>
        </div>
      </nav>
      <section className="project-detail-in-depth">
        <div className="project-detail-topic">
          {topic == "story" && <Story project={project} />}
          {topic == "risks" && <Risks project={project} />}
          {topic == "comments" && <Comments project={project} />}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
