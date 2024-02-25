import { useState } from "react";
import CommentList from "../../Comments/CommentList/CommentList"
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateComment } from "../../../redux/comments";
import { useParams } from "react-router-dom";
import './CommentSection.css'

export const Comments = () => {
  const dispatch = useDispatch()
  const { projectId } = useParams()
  const [ showNewCommentField, setShowNewCommentField ] = useState(false)
  const [ comment, setComment ] = useState("")
  const [ errors, setErrors ] = useState({})
  const user = useSelector(state => state.session.user)

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})
 
    const validationErrors = {}
    if (!comment) validationErrors.comment = "Comment must not be empty"

    if (Object.values(validationErrors).length) {
      setErrors(validationErrors)
    } else {
      const commentData = {
        comment
      }
      setComment('')
      setShowNewCommentField(false)

      dispatch(thunkCreateComment(projectId, commentData))
    }
  }

    return (
        <div className="comment-section">
            <div className="new-comment-div">
              {!showNewCommentField && user &&
                <button id="new-comment-button" onClick={() => setShowNewCommentField(true)}><span><FaPlus /></span> New comment</button>}
              {showNewCommentField &&
                <div>
                  <textarea
                    placeholder="Comment here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className="comments-submit-cancel">
                    <button onClick={() => setShowNewCommentField(false)}>Cancel</button>
                    <button onClick={handleSubmit}>Submit</button>
                  </div>
                  {"comment" in errors && <div className="errors">
                    <p>{errors.comment}</p>
                  </div>}
                </div>
              }
              {!user && <h4>You must be logged in to leave a comment</h4>}
            </div>
            <CommentList />
        </div>
    )
}