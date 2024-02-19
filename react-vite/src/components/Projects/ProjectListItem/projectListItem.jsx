import { useEffect } from "react"
import {Link} from 'react-router-dom'
import { FaMapMarkerAlt } from "react-icons/fa";

// backed projects, liked projects, categories page, created projects
export const ProjectListItem = ({ project }) => {

    const daysToGo = Math.round(project.end_date.getTime() - new Date().getTime()) / (1000 * 3600 * 24)
    const fundingPercentage = project.totalFunded / project.fundingGoal
    const categoryName = project.category.replace("-", " & ")

    return (
    <li>
        <div className="card-project-image">
            <img src={`${project.coverImage}`} alt="cover image of project" />
        </div>
        <div className="card-text-div">
            <div className="card-titles">
                <h2>{project.title}</h2>
                <p>{project.subtitle}</p>
                <p>by <span>{project.owner.firstName} {project.owner.lastName}</span></p>
            </div>
            <div className="card-funding-progress">{project.fundingGoal} {project.totalFunded}</div>

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

