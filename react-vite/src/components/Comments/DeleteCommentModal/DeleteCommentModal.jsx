import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkDeleteComment, thunkGetComments } from "../../../redux/comments";

export const DeleteCommentModal = ({ comment }) => {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const { projectId } = useParams()

  const handleDelete = async (e) => {
    e.preventDefault()
    dispatch(thunkDeleteComment(projectId, comment.id))
    dispatch(thunkGetComments(projectId))
    closeModal()
  }

  const handleCancel = (e) => {
    e.preventDefault()
    closeModal()
  }

  return (
    <div className='delete-project-modal'>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this comment?</p>
      <button id='project-delete-yes-btn' onClick={handleDelete}>Yes (Delete Comment)</button>
      <button id='project-delete-no-btn' onClick={handleCancel}>No (Keep Comment)</button>
    </div>
  );
}