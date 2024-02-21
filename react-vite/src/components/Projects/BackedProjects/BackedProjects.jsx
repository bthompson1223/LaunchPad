import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { ProjectListItem } from "../ProjectListItem/projectListItem"
import { thunkGetBackings, clearBackings } from "../../../redux/backings"

const BackedProjects = () => {
  const dispatch = useDispatch()
  const projectsObj = useSelector(state => state.backings)
  
  useEffect(() => {
    dispatch(thunkGetBackings())
    
    return () => dispatch(clearBackings())
  }, [dispatch])
  

  if (Object.values(projectsObj).length) {
    return <h1>You have not backed any projects yet!</h1>
  }
  
  console.log(projectsObj)
  const projects = Object.values(projectsObj)

  return (
    <div>
      <ul>
        {projects.map((project) => (
          <ProjectListItem project={project} key={project.id} />
        ))}
      </ul>
    </div>
  )
}

export default BackedProjects