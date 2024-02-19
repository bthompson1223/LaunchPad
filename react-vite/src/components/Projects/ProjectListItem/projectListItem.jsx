import {Link} from 'react-router-dom'
import { FaMapMarkerAlt } from "react-icons/fa";

// backed projects, liked projects, categories page, created projects
export const ProjectListItem = ({ project }) => {
    const msDay = 60*60*24*1000;
    const daysToGo = Math.floor(((new Date(project.end_date) - new Date()) / msDay));
    const fundingPercentage = project.totalFunded / project.fundingGoal
    const categoryName = project.category.replace("-", " & ")

    return (
    <li>
        <Link to={`/projects/${project.id}`}>
            <div className="card-project-image">
                <img src={`${project.coverImage}`} alt="cover image of project" />
            </div>
        </Link>
        <div className="card-text-div">
            <div className="card-titles">
                <Link to={`/projects/${project.id}`}>
                    <h2>{project.title}</h2>
                    <p>{project.subtitle}</p>
                </Link>
                <p>by <span>{project.owner.first_name} {project.owner.last_name}</span></p>
            </div>
            {/* <div className="card-funding-progress">{project.fundingGoal} {project.totalFunded}</div> */}

            <div className="card-stats">
                <p>${project.totalFunded} pledged</p>
                <p>{fundingPercentage}% funded</p>
                <p>{daysToGo} days to go</p>
            </div>
            
            <div>
                <Link to={`/category/${project.category}`}>{categoryName}</Link>
                <span><span><FaMapMarkerAlt /></span>{project.location}</span>
            </div>
        </div>
    </li>
    )
}

