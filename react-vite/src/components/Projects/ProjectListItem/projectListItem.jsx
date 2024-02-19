import { useEffect } from "react"

// backed projects, liked projects, categories page, created projects
export const ProjectListItem = ({ project }) => {
    <li>
        <div className="card-project-image">
            <img src="" alt="" />
        </div>
        <div className="card-text-div">
            <div className="card-titles">
               <h2>{project.title}</h2>
               <p>{project.subtitle}</p>
                
            </div>
            <div className="card-progress-bar"></div>
            <div className="card-stats"></div>
        </div>
    </li>
}

