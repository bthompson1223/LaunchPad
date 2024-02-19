import { useEffect } from "react"
import {Link} from 'react-router-dom'

// backed projects, liked projects, categories page, created projects
export const ProjectListItem = ({ project }) => {

    const daysToGo = Math.round(project.end_date.getTime() - new Date().getTime()) / (1000 * 3600 * 24)
    const fundingPercentage = project.totalFunded / project.fundingGoal

    return (
    <li>
        <div className="card-project-image">
            <img src="" alt="" />
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
                <Link to={`/category/${project.category}`}></Link>
            </div>
        </div>
    </li>
    )
}

