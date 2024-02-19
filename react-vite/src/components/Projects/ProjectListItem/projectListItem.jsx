import { useEffect } from "react"

// backed projects, liked projects, categories page, created projects
export const ProjectListItem = ({ project }) => {

    const daysToGo = project.end_date 

    return (
    <li>
        <div className="card-project-image">
            <img src="" alt="" />
        </div>
        <div className="card-text-div">
            <div className="card-titles">
                <h2>{project.title}</h2>
                <p>{project.subtitle}</p>
                <p>by <span>{project.owner.first_name} {project.owner.last_name}</span></p>
            </div>
            <div className="card-stats">

            </div>
        </div>
    </li>
    )
}

