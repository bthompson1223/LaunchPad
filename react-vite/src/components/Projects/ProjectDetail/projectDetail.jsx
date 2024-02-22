import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaRegCompass } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { thunkGetOneProject } from "../../../redux/project";
import { Story } from "./StorySection";
import { Risks } from "./RiskSection";
import { Comments } from "./CommentSection";
import { DeleteProjectModal } from "../DeleteProjectModal/DeleteProjectModal";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";


const ProjectDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const project = useSelector(state => state.projects[projectId]);
    const user = useSelector(state => state.session.user)
    const [topic, setTopic] = useState("story")
    
    useEffect(() => {
        dispatch(thunkGetOneProject(projectId))
        
    }, [dispatch, projectId])
    
    if (!project) return null

    const msDay = 60*60*24*1000;
    const daysToGo = ((new Date(project.end_date) - new Date()) / msDay);
  
    let daysLeft = Math.floor(daysToGo)
   
    let hoursLeft;
    if (daysLeft < 1) {
      hoursLeft = Math.round(daysToGo*24)
    }

    let isOwner = false;
    if (user?.id == project.owner.id) {
      isOwner = true;
    }

    return (
        <div>
        <section className="project-detail-container">
            <div className="project-detail-titles">
                <h1>{project.title}</h1>
                <p>{project.subtitle}</p>
            </div>

            <div className="project-detail">
                <div className="project-detail-image">
                    <img src={project.coverImage} alt="Cover image for the project" />
                    <div>
                        <span><span><FaRegCompass /></span>{project.category}</span>
                        <span><span><FaMapMarkerAlt /></span>{project.location}</span>
                    </div>
                </div>

                <div className="project-detail-stats">
                    <div>
                        <h3>${project.totalFunded}</h3>
                        <p>pledged of ${project.fundingGoal} goal</p>
                    </div>

                    <div>
                        <h3>{project.numOfBackers}</h3>
                        <p>backers</p>
                    </div>

                    <div>
                        {daysLeft == 0 && <><h3>{hoursLeft}</h3> <p>hours left!</p></>}
                        {daysLeft > 0 && <><h3>{daysLeft}</h3> <p>days left</p></>}
                    </div>
                    {isOwner == false && <button onClick = {() => navigate(`/projects/${project.id}/rewards`)}>Back this project</button>}
                    {isOwner && <button onClick = {() => navigate(`/projects/${project.id}/edit`)}>Edit project</button>}
                    {isOwner && <button onClick = {() => navigate(`/projects/${project.id}/rewards`)}>View Rewards</button>}
                    {isOwner && <button onClick = {() => navigate(`/projects/${project.id}/rewards/new`)}>Add a Reward</button>}
                    {isOwner && 
                      <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteProjectModal project={project}/>}/>}
                </div>
            </div>
        </section>
        <section className="project-detail-in-depth">
            <nav className="project-detail-nav">
                <NavLink onClick={() => setTopic("story")}>Story</NavLink>
                <NavLink onClick={() => setTopic("risks")}>Risks</NavLink>
                <NavLink onClick={() => setTopic("comments")}>Comments</NavLink>
            </nav>
            <div className="project-detail-topic">
                {topic == "story" && <Story project={project} />}
                {topic == "risks" && <Risks project={project} />}
                {topic == "comments" && <Comments project={project}/>}
            </div>
        </section>
        </div>
    )
}

export default ProjectDetail