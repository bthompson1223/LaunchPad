import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkDeleteProject } from "../../../redux/project";
import { clearUserProjects } from "../../../redux/session";
import './DeleteProjectModal.css'

export const DeleteProjectModal = ({ project }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { closeModal } = useModal()

  const handleDelete = async (e) => {
    e.preventDefault()
    await dispatch(thunkDeleteProject(project.id))
    dispatch(clearUserProjects())
    closeModal()
    navigate('/projects/created-projects')
  }

  const handleCancel = (e) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div className='delete-project-modal'>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this project?</p>
      <button  onClick={handleDelete}>Yes (Delete Project)</button>
      <button onClick={handleCancel}>No (Keep Project)</button>
    </div>
  );
}