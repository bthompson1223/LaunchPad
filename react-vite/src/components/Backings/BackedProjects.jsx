import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkGetBackings, clearBackings } from "../../redux/backings"
import BackedListItem from "./BackedListItem"
import './BackedProjects.css'

const BackedProjects = () => {
  const dispatch = useDispatch()
  const backingsObj = useSelector(state => state.backings)

  
  useEffect(() => {
    dispatch(thunkGetBackings())
    
    return () => dispatch(clearBackings())
  }, [dispatch])
  
  if (!backingsObj) return null;
  if (!Object.values(backingsObj).length) {
    return <h1>You have not backed any projects yet!</h1>
  }

  const backings = Object.values(backingsObj)

  return (
    <div className="backed-list">
      <h1>Backed Projects</h1>
      <ul>
        {backings.map((backing) => (
          <BackedListItem backing={backing} key={backing.id} />
        ))}
      </ul>
    </div>
  )
}

export default BackedProjects