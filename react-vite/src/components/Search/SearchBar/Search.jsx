import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { clearSearch, thunkSearchProjects } from "../../../redux/search"
import "./Search.css"
import { FaSearch, FaTimes } from "react-icons/fa";
import { SearchedProject } from "../SearchedProject/SearchedProject"

const Search = () => {
  const dispatch = useDispatch()
  const projectsObj = useSelector(state => state.search)
  const [ searchValue, setSearchValue ] = useState("")
  
  useEffect(() => {
    if (searchValue !== "") {

      let timeoutId = setTimeout(() => {
        dispatch(thunkSearchProjects(searchValue))
        
      }, 500)
      
      return () => {
        clearTimeout(timeoutId)
        dispatch(clearSearch())
      }
    }
  }, [dispatch, searchValue])

  const projects = Object.values(projectsObj)

  return (
    <>
        <FaSearch className="search-icon" id="search-icon"/>
        <input id="search-bar" type="text" placeholder="Search projects" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
        <FaTimes id="clear-search" onClick={() => setSearchValue("")}/>
      {searchValue && <div className="search-results-div">
        {Object.values(projectsObj).length ? 
        <ul className="search-results">
          {projects.map((project) => (
            <SearchedProject project={project} setSearchValue={setSearchValue} key={project.id} />
          ))}
        </ul>
        :
        <div className="search-results">
          <h1>No projects found!</h1>
        </div>
        }
      </div>}
    </>
  )
}

export default Search