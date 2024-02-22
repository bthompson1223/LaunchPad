import { useDispatch, useSelector } from "react-redux"
import { ProjectListItem } from "../Projects/ProjectListItem/projectListItem"
import { useEffect, useState } from "react"
import { clearSearch, thunkSearchProjects } from "../../redux/search"

const Search = () => {
  const dispatch = useDispatch()
  const [ searchValue, setSearchValue ] = useState("")
  const projectsObj = useSelector(state => state.search)
  
  useEffect(() => {
    return () => dispatch(clearSearch())
  }, [dispatch])


  // if (!Object.values(projectsObj).length) {
  //   return <h1>No projects found!</h1>
  // }

  const projects = Object.values(projectsObj)

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(thunkSearchProjects(searchValue))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
        <button>Search</button>
      </form>
      <div className="search-results">
        <ul>
          {projects.map((project) => (
            <ProjectListItem project={project} key={project.id} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Search