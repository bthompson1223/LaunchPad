import { useNavigate } from "react-router-dom";
import "./SearchedProject.css";

export const SearchedProject = ({project, setSearchValue}) => {
  const navigate = useNavigate()
  
  const msDay = 60 * 60 * 24 * 1000;
  const daysToGo = (new Date(project.end_date) - new Date()) / msDay;

  let daysLeft = Math.floor(daysToGo);

  let hoursLeft;
  if (daysLeft < 1) {
    hoursLeft = Math.round(daysToGo * 24);
  }


  const handleClick = () => {
    navigate(`/projects/${project.id}`)
    setSearchValue("")
  }

  return (
    <li className="searched-project-li" onClick={handleClick}>
      <div className="searched-project-img-div">
        <img src={project.coverImage} alt="" />
      </div>
      <div className="searched-project-info">
        <h2>{project.title}</h2>
        <span>by {project.owner.first_name} {project.owner.last_name}</span>
        <span>{Math.floor((project.totalFunded/project.fundingGoal) * 100)}% funded {daysLeft > 0 && <>{daysLeft} days to go</>}{daysLeft == 0 && <>{hoursLeft} hours to go</>}</span>
      </div>
    </li>
  )
}