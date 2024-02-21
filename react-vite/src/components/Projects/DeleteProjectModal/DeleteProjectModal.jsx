import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkDeleteProject } from "../../../redux/project";
import { clearUserProjects } from "../../../redux/session";

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
      <h1>Confirm Delete</h1>
      <h4>Are you sure you want to remove this project?</h4>
      <button id='project-delete-yes-btn' onClick={handleDelete}>Yes (Delete Project)</button>
      <button id='project-delete-no-btn' onClick={handleCancel}>No (Keep Project)</button>
    </div>
  );
}