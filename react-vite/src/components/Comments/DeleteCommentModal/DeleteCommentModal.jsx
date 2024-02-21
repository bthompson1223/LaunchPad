import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkDeleteComment } from "../../../redux/comments";

export const DeleteCommentModal = ({ comment }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { closeModal } = useModal()

  const handleDelete = async (e) => {
    e.preventDefault()
    dispatch(thunkDeleteComment(comment.id))
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
      <h4>Are you sure you want to remove this comment?</h4>
      <button id='project-delete-yes-btn' onClick={handleDelete}>Yes (Delete Comment)</button>
      <button id='project-delete-no-btn' onClick={handleCancel}>No (Keep Comment)</button>
    </div>
  );
}