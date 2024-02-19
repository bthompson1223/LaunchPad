import projectReducer from "../../../redux/project"
import { FaMapMarkerAlt, FaRegCompass } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProjectDetail = () => {
    const navigate = useNavigate()
    const msDay = 60*60*24*1000;
    const daysToGo = Math.floor(((new Date(project.end_date) - new Date()) / msDay));

    return (
        <div className="project-detail-container">
            <div className="project-detail-titles">
                <h1>{project.title}</h1>
                <p>{project.subtitle}</p>
            </div>

            <div className="project-detail">
                <div className="project-detail-image">
                    {project.coverImage}
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
                        <h3>${project.numOfBackers}</h3>
                        <p>backers</p>
                    </div>

                    <div>
                        <h3>${daysToGo}</h3>
                        <p>days to go</p>
                    </div>
                    <button onClick = {() => navigate(`/projects/${project.id}/rewards`)} >Back this project</button>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail