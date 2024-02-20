import { useEffect } from "react";
import { FaMapMarkerAlt, FaRegCompass } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkGetOneProject } from "../../../redux/project";

const ProjectDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const project = useSelector(state => state.projects[projectId]);
    let topic = "story";
    
    useEffect(() => {
        dispatch(thunkGetOneProject(projectId))
        
    }, [dispatch, projectId])
    
    const msDay = 60*60*24*1000;

    // if (Object.values(project).length == 0) return null;
    if (!project) return null

    const daysToGo = Math.floor(((new Date(project.end_date) - new Date()) / msDay));
    
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
                        <h3>${project.numOfBackers}</h3>
                        <p>backers</p>
                    </div>

                    <div>
                        <h3>${daysToGo}</h3>
                        <p>days to go</p>
                    </div>
                    <button onClick = {() => navigate(`/projects/${project.id}/rewards`)}>Back this project</button>
                </div>
            </div>
        </section>
        <section className="project-detail-in-depth">
            <nav className="project-detail-nav">
                <span onClick={() => topic = "story"}>Story</span>
                <span onClick={() => topic = "risks"}>Risks</span>
                <span onClick={() => topic = "comments"}>Comments</span>
            </nav>
            <div className="project-detail-topic">
                {topic == "story" && <Story project={project} />}
                {topic == "risks" && <Risks project={project} />}
                {topic == "comments" && <Comments />}
            </div>
        </section>
        </div>
    )
}

export default ProjectDetail