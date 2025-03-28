import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import { DeleteCommentModal } from "../DeleteCommentModal/DeleteCommentModal";
import './commentListItem.css'
import { useDispatch } from "react-redux";
import { thunkCreateComment } from "../../../redux/comments";
import { thunkGetComments} from "../../../redux/comments";

const CommentListItem = ({ comment }) => {
  const user = useSelector(state => state.session.user)
  const parentId = comment.id
  const projectId = comment.project_id
  const dispatch = useDispatch()
  const msDay = 60*60*24*1000;
  const daysAfterPosting =  ((new Date() - new Date(comment.created_at)) / msDay);

  const [ showReplyField, setShowReplyField ] = useState(false)
  const [ reply, setReply ] = useState("")
  const [ errors, setErrors ] = useState({})
  const [newReply, setNewReply] = useState(false)
  const hasReplies = comment?.replies?.length > 0

  let postedDaysAgo = Math.floor(daysAfterPosting)
 
  let hoursAfterPosting;
  if (daysAfterPosting < 1) {
    hoursAfterPosting = Math.round(daysAfterPosting*24)
  }
  
  const isCommenter = user?.id == comment.user_id

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors({})
 
    const validationErrors = {}
    if (!reply) validationErrors.reply = "Reply must not be empty"

    if (Object.values(validationErrors).length) {
      setErrors(validationErrors)
    } else {
      const commentData = {
        reply, parentId
      }
      setReply('')
      setShowReplyField(false)

      dispatch(thunkCreateComment(projectId, commentData))
      setNewReply(!newReply)
    }
  }

  useEffect(() => {
    dispatch(thunkGetComments(projectId))
  }, [dispatch, projectId, newReply])

  return (
    <div className="comment-container">
      <div className="commenter-div">
        <div>
          <img id='commenter-profile-image' src={comment.user_image} alt="" />
        </div>
        <div className="commenter-data">
          <h4>{comment.username}</h4>
          {postedDaysAgo == 0 && <p>posted {hoursAfterPosting} hours ago</p>}
          {postedDaysAgo > 0 && <p>{postedDaysAgo} {postedDaysAgo > 1 ? "days" : "day"} ago</p>}
        </div>
        {isCommenter && <div className="comment-delete-container">
          <OpenModalButton
            buttonText={<FaTimes />}
            modalComponent={<DeleteCommentModal comment={comment} />} />
        </div>}
      </div>
      <div className="comment">
        <p>{comment.comment}</p>
      </div>
      <div className="new-reply-div">
        {!showReplyField && user && <button id="reply-button" onClick={() => setShowReplyField(true)}>Reply</button>}
        {showReplyField &&
          <div className="comment-replies">
            <textarea
              placeholder="Reply here"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <div className="comments-errors-buttons">
              <div className="errors">
                {"reply" in errors &&
                  <span>{errors.reply}</span>
                }
              </div>
              <div className="comments-submit-cancel">
                <button onClick={() => setShowReplyField(false)}>Cancel</button>
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>

          </div>
        }
      </div>
      <div className="comment-replies">
        {hasReplies && (
          <div className="replies-container">
            {comment.replies.map(reply => (
              <CommentListItem key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentListItem