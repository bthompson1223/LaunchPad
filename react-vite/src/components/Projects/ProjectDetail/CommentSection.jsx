import { useState } from "react";
import CommentList from "../../Comments/CommentList/CommentList"
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { thunkCreateComment } from "../../../redux/comments";
import { useParams } from "react-router-dom";

export const Comments = () => {
  const dispatch = useDispatch()
  const { projectId } = useParams()
  const [ showNewCommentField, setShowNewCommentField ] = useState(false)
  const [ comment, setComment ] = useState("")
  const [ errors, setErrors ] = useState({})

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
        <div>
            <div>
              {!showNewCommentField &&
                <button onClick={() => setShowNewCommentField(true)}><span><FaPlus /></span> New comment</button>}
              {showNewCommentField &&
                <div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button onClick={handleSubmit}>Submit</button>
                  <button onClick={() => setShowNewCommentField(false)}>Cancel</button>
                  {"comment" in errors && <div className="errors">
                    <p>{errors.comment}</p>
                  </div>}
                </div>
              }
            </div>
            <CommentList />
        </div>
    )
}